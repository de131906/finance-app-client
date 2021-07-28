import { BaseEntity } from "./base-entity";

export interface Institution extends BaseEntity {
	name: string;
	bic: string;
}