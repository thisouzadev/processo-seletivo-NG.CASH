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
   const  userId  = req.user
  //  console.log(userId.id);
   
   const getMyBalance = await usersRepository.findOne({
    where: { id: parseInt(req.user.id) },
    relations: {
      accounts: true,
    },
  })
  // console.log(getMyBalance?.accounts.balance, 'mybalance');
  
  // await usersRepository.findOneOrFail({ where: username })
  let transactions = new Transactions()
  transactions.value = value
  let accounts = new Accounts()
  // accounts.transactions.accounts.balance = 50
  accounts.transactions.accounts.id = 2
  // transactions.accounts.balance = 50
  accounts.transactions = transactions
  
  
  
   //  transactions.accounts2 = id
   //  transactions.accounts = accounts
   
   try {
     const newTransactions = transactionsRepository.create(transactions)
     await transactionsRepository.save(transactions)
     await accountsRepository.save(accounts)
     console.log(transactions, 'transactions');
     console.log(accounts.transactions, 'accounts');
     return res.status(201).json(newTransactions)
   } catch (error) {
    console.log(error)
			return res.status(500).json({ message: 'Internal Server Error' })
   }
  } 
}