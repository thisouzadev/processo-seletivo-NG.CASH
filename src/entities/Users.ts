import {
	Column,
	Entity,
	OneToOne,
	JoinColumn,
	PrimaryGeneratedColumn,
	Unique,
} from 'typeorm'

import {
	IsNotEmpty,
	IsString,
	Matches,
	MinLength,
	MaxLength,
	Length
} from "class-validator"

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
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]{8,}).*$/, {message: 'password weak'})
	password: string;

	@OneToOne(() => Accounts)
  @JoinColumn()
  accounts: Accounts;
}
