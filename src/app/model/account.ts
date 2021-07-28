import { BaseEntity } from "./base-entity";
import { Currency } from "./currency";
import { Institution } from "./institution";

export interface Account extends BaseEntity {
	institution: Institution;
	currency: Currency;
	accountType: string;
	name: string;
	iban: string;
	balance?: number;
	openBalance?: number;
	openDate?: Date;
}