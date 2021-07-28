import { BaseEntity } from "./base-entity";
import { Account } from './account';
import { Equity } from './equity';
import { Price } from './price';

export interface Investment extends BaseEntity {
	depot: Account;
	equity: Equity;
	quantity?: number;
	price?: Price;
	value?: number;
	expenditure?: number;
	profit?: number;
	earning?: number;
	yield?: number;
}
