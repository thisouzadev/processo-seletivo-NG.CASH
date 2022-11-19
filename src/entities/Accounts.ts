import {
	Check,
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'

import { Transactions } from './Transactions'
import { Users } from './Users'

@Entity('accounts')
@Check('"balance" >= 0')
export class Accounts {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	balance: number

	@OneToMany(() => Transactions, (transactions: Transactions) => transactions.creditedAccount, {cascade: true})
	creditTransactions: Transactions[]

	@OneToMany(() => Transactions, (transactions: Transactions) => transactions.debitedAccount, {cascade: true})
	debiteTransactionss: Transactions[]

}
