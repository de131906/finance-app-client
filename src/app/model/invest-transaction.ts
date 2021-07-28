import { BaseEntity } from "./base-entity";
import { Investment } from "./investment";
import { Transaction } from "./transaction";

export interface InvestTransaction extends BaseEntity {
	investment: Investment;
	date: Date;
	type: string;
	price: number;
	quantity: number;
	reference: string;
	fee?: number;
	tax?: number;
	transaction?: Transaction
}