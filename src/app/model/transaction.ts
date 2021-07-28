import { BaseEntity } from "./base-entity";
import { Account } from "./account";

export interface Transaction extends BaseEntity {
	account: Account;
	counterTransaction?: Transaction;
	counterAccount?: Account;
	amount: number;
	date: Date;
	type: string;
	reference: string;
	principal?: string;
	payee?: string;
}