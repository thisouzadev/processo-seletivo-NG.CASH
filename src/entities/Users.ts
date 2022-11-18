import {
	Column,
	Entity,
	OneToOne,
	JoinColumn,
	PrimaryGeneratedColumn,
	Unique,
	BeforeInsert,
} from 'typeorm'

import {
	IsNotEmpty,
	IsString,
	Matches,
	MinLength,
	MaxLength,
	Length
} from "class-validator"

import * as bcrypt from "bcryptjs"
import { Accounts } from './Accounts'

@Entity('users')
@Unique(["username"])
export class Users {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@IsString()
	@MinLength(3)
	username: string;

	@Column()
	@IsString()
  @MinLength(8)
	@Matches(/^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$/, {message: 'password weak'})
	password: string;

	@OneToOne(() => Accounts, { "cascade": true })
	@JoinColumn({ name: 'accountId' })
	accounts: Accounts

	hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}
