import { BaseEntity } from "./base-entity";

export interface Currency extends BaseEntity {
	symbol: string;
	name: string;
}