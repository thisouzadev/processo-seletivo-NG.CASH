import { accountsRepository } from './../repositories/accoutsRepository'
import { Request, Response } from 'express'
import { usersRepository } from '../repositories/usersRepository'
import { validate } from "class-validator"
import * as jwt from "jsonwebtoken"
import { Users } from "../entities/Users"
import config from "../config/config"
import { Accounts } from '../entities/Accounts'

export class UsersController {
	async create(req: Request, res: Response) {
		const { username, password } = req.body
		let user = new Users()
		user.username = username
		user.password = password

		const errors = await validate(user)
		if (errors.length > 0) {
			res.status(400).send(errors)
			return
		}

		user.hashPassword();
		try {
			
			const newUser = usersRepository.create(user)
			
			await usersRepository.save(newUser)
			const accounts = new Accounts()
			accounts.balance = 100
			await accountsRepository.save(accounts)
			
			return res.status(201).json(newUser)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Sever Error' })
		}
	}

	async list(req: Request, res: Response) {
		try {
			const users = await usersRepository.find({
				select:["id", "username"]
			})

			return res.json(users)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Sever Error' })
		}
	}

	async login(req: Request, res: Response) {

    let { username, password } = req.body
    if (!(username && password)) {
      res.status(400).send()
    }

    try {
			let user: Users
			 user = await usersRepository.findOneOrFail({ where: { username } })
			 const token = jwt.sign(
				 {  userId: user.id, username: user.username  },
				 config.jwtSecret,
				 { expiresIn: "24h" }
			 )
			 res.send(token)
    } catch (error) {
			res.status(401).send({ message: 'not found' })
    }
  }

}