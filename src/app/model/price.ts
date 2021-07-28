import { BaseEntity } from './base-entity';
import { Equity } from './equity';

export interface Price extends BaseEntity {
	equity: Equity;
	date: Date;
	rate: string;
}
