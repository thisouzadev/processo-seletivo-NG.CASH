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

	@ManyToOne(() => Accounts, accounts => accounts.transactions)
	@JoinColumn({ name: 'debitedAccountId' })
	accounts: Accounts

	@ManyToOne(() => Accounts, accounts => accounts.transactions)
	@JoinColumn({ name: 'creditedAccountId' })
	accounts2: Accounts

	@Column()
	value: number

	@CreateDateColumn({ 
		type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"
	 })
	public created_at: Date

}