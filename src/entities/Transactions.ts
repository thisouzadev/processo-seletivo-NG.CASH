import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	CreateDateColumn,
} from 'typeorm'
 import { Accounts } from './Accounts'
 @Entity('transactions')
 export class Transactions {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne((type) => Accounts, (accounts: Accounts) => accounts.transactions)
	@JoinColumn({
		name: 'debitedAccountId',
		referencedColumnName: "accounts",
	})
	accounts: Accounts

	@ManyToOne((type) => Accounts, (accounts: Accounts) => accounts.transactions)
	@JoinColumn({
		name: 'creditedAccountId',
		referencedColumnName: "accounts",
	})
	accounts2: Accounts

	@Column()
	value: number

	@CreateDateColumn()
	createdAt: Date

}