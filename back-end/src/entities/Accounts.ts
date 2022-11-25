import {
	Check,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'

import { Transactions } from './Transactions'

@Entity('accounts')
@Check('"balance" > 0')
export class Accounts {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	balance: number

	@OneToMany(() => Transactions, (transactions: Transactions) => transactions.creditedAccount, {cascade: true})
	creditTransactions: Transactions[]

	@OneToMany(() => Transactions, (transactions: Transactions) => transactions.debitedAccount, {cascade: true})
	debiteTransactions: Transactions[]

}
