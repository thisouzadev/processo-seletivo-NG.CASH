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

	@Column()
	debitedAccountId: number
	@ManyToOne((type) => Accounts, (accounts: Accounts) => accounts.creditTransactions)
	@JoinColumn({ name: 'debitedAccountId' })
	debitedAccount: Accounts

	@Column()
	creditedAccountId: number
	@ManyToOne((type) => Accounts, (accounts: Accounts) => accounts.debiteTransactionss)
	@JoinColumn({ name: 'creditedAccountId' })
	creditedAccount: Accounts

	@Column()
	value: number
	

	@CreateDateColumn()
	createdAt: Date

}