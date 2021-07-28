import { BaseEntity } from "./base-entity";
import { Currency } from "./currency";

export interface ClearingAccount extends BaseEntity {
	name: string;
	accountType: string;
	currency: Currency;
	balance?: number;
}