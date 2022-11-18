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

	@OneToMany(() => Transactions, (transactions: Transactions) => transactions.accounts, {cascade: true})
	transactions: Transactions

}
