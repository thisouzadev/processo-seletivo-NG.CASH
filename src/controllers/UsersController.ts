import { accountsRepository } from './../repositories/accoutsRepository'
import { Request, Response } from 'express'
import { usersRepository } from '../repositories/usersRepository'
import { validate } from "class-validator"
import { Users } from "../entities/Users"
import { Accounts } from '../entities/Accounts'

const { createToken } = require('../middlewares/auth');

export class UsersController {
	async create(req: Request, res: Response) {
		const { username, password } = req.body
		let user = new Users()
		user.username = username
		user.password = password

		const accounts = new Accounts()
		accounts.balance = 100
		user.accounts = accounts

		const errors = await validate(user)
		
		 
		user.hashPassword();
		try {
			if (errors.length > 0) {
				return res.status(400).send(errors)
			} else {
				const newUser = usersRepository.create(user)
				
				await usersRepository.save(newUser)
				await accountsRepository.save(accounts)
				
				return res.status(201).json(newUser)
			}
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Server Error' })
		}
	}

	async login(req: Request, res: Response) {
    let { username, password } = req.body
    if (!(username && password)) {
      res.status(400).send({ message:  'Not Found' })
    }

    try {
			let user: Users
			 user = await usersRepository.findOneOrFail({ where: { username } })
			 const token = createToken({ payload: user });
			 res.send(token)
    } catch (error) {
			res.status(401).send({ message: 'Not found' })
    }
  }

}