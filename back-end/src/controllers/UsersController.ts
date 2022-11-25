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
		try {
			if (errors.length > 0) {
				console.log(errors);
				return res.status(400).json({ message:'validate fail' })
			} 
			const userVerifcExist = await usersRepository.findOne({ where: { username } })
			if (userVerifcExist) {return res.status(400).json({ message: 'user name already exist' })}
			user.hashPassword();
		 
			const newUser = usersRepository.create(user)
				
			await usersRepository.save(newUser)
				
			return res.status(201).json(newUser)
			
		} catch (error: any) {
			console.log(error);
		
			return res.status(500).json(error)
		}
	}

	async login(req: Request, res: Response) {
    let { username, password } = req.body
		try {
    if (!(username && password)) {
      res.status(400).json({ message:  'Not Found' })
    }
		const userVerifcExist = await usersRepository.findOne({ where: { username } })
		if (!userVerifcExist) {return res.status(401).json({ message: 'not found' })}

			let user: Users
			 user = await usersRepository.findOneOrFail({ where: { username } })
			 const token = createToken({ payload: user });
			 res.status(200).json(token)
    } catch (error) {
			res.status(401).json({ message: 'Not found' })
    }
  }

	async getAllUser(req: Request, res: Response) {
		try {
			const getAll:any = await usersRepository.find({
				relations: {
				accounts: true
			}
		},)
		res.status(200).json(getAll)
		} catch (error) {
			res.status(500).json({ message: 'Internal Server Error' })
		}
	}
	async getUser(req: Request, res: Response) {
		let { userId } = req.body
		try {
			const getUser:any = await usersRepository.findOne({
				where: {id: userId}
			}
		)
		res.status(200).json(getUser)
		} catch (error) {
			res.status(500).json({ message: 'Internal Server Error' })
		}
	}
}