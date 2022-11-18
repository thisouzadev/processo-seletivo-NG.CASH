import { Accounts } from './../entities/Accounts';
import { Transactions } from './../entities/Transactions';
import { transactionsRepository } from '../repositories/transactionsRepository';
import { Request, Response } from 'express';
import { usersRepository } from '../repositories/usersRepository';

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
   const { value, id } = req.body
   const  userId  = req.user
   const getMyBalance = await usersRepository.findOne({
    where: { id: parseInt(req.user.id) },
    relations: {
      accounts: true,
    },
  })
  const getMyBalanceId =  getMyBalance?.accounts.id
   let transactions = new Transactions()
   transactions.value = value
   
   let accounts = new Accounts()
  //  accounts = getMyBalanceId

   transactions.accounts2 = id
   transactions.accounts = accounts
   
   try {
     const newTransactions = transactionsRepository.create(transactions)
     await transactionsRepository.save(transactions)
     return res.status(201).json(newTransactions)
   } catch (error) {
    console.log(error)
			return res.status(500).json({ message: 'Internal Server Error' })
   }
  } 
}