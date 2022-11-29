import { accountsRepository } from './../repositories/accoutsRepository';
import { Accounts } from './../entities/Accounts';
import { Transactions } from './../entities/Transactions';
import { transactionsRepository } from '../repositories/transactionsRepository';
import { Request, Response } from 'express';
import { usersRepository } from '../repositories/usersRepository';
import { Users } from '../entities/Users';

export class AccountsController {
  async list(req: Request, res: Response) {
   
		try {
			const getAccount = await usersRepository.findOne({
        where: { id: parseInt(req.user.id) },
				relations: {
					accounts: true,
				},
			})

			return res.status(200).json(getAccount)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Server Error' })
		}
	}

  async transactionsCreate(req: Request, res: Response) {
   const { value, username } = req.body
   
   const getMyUser = await usersRepository.findOne({
    where: { id: parseInt(req.user.id) },
    relations: {
      accounts: true,
    },
  })
  const getDestinationUser = await usersRepository.findOne({
    where: { username: username },
    relations: {
      accounts: true,
    },
  })
  if (!getDestinationUser) {
    return res.status(404).json({ message: 'not found destination username' })
  }
  if (!getMyUser) {
    return res.status(404).json({ message: 'not found my user' })
  }

  const destinationsAccount = await accountsRepository.findOne({
    where: { id: getDestinationUser.accounts.id }
  })
  if (!destinationsAccount) {
    return res.status(404).json({ message: 'not found destinationsAccount' })
  }

  const myAccount = await accountsRepository.findOne({
    where: { id: getMyUser.accounts.id }
  })
  if (!myAccount) {
    return res.status(404).json({ message: 'not found myAccount' })
  }

  let transactions = new Transactions()
  transactions.value = value
  transactions.debitedAccountId = getMyUser.accounts.id
  transactions.creditedAccountId = getDestinationUser.accounts.id

  if (transactions.debitedAccountId == transactions.creditedAccountId) {
    return res.status(401).json({ message: 'invalid operation' })
  }
  if (value > myAccount.balance || value == 0 ) {
    return res.status(404).json({ message: 'you do not have enough money' })
  }
  myAccount.balance -= value 
  destinationsAccount.balance += value

   try {
     const newTransactions = transactionsRepository.create(transactions)
     await transactionsRepository.save(transactions)
     await accountsRepository.save(myAccount)
     await accountsRepository.save(destinationsAccount)

     return res.status(201).json(newTransactions)
   } catch (error) {
    console.log(error)
			return res.status(500).json({ message: 'Internal Server Error' })
   }
  } 

  async getAllMyTransactions(req:Request, res:Response) {
    const { transactionsDate } = req.query as any as { transactionsDate: string } 
    
    try {

      const getMyUser = await usersRepository.findOne({
        where: { id: parseInt(req.user.id) },
        relations: {
          accounts: { creditTransactions: true, debiteTransactions: true },
        },
      })
      if (!getMyUser) {
        return res.status(404).json({ message: 'user not found' })
      }
      
			getMyUser.accounts.creditTransactions = getMyUser?.accounts.creditTransactions.filter(
        (transactions) => String(transactions.createdAt.toISOString()).includes(transactionsDate)
      )
      getMyUser.accounts.debiteTransactions = getMyUser?.accounts.debiteTransactions.filter(
        (transactions) => String(transactions.createdAt.toISOString()).includes(transactionsDate)
      )

			return res.status(200).json(getMyUser)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Server Error' })
		}
  }
}