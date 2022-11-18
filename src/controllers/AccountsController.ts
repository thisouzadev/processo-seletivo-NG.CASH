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

   let transactions = new Transactions()
   transactions.value = value
  //  transactions.accounts = req.user.id
   let accounts = new Accounts()
   accounts.transactions = [transactions]
   
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