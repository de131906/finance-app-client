import { BaseEntity } from './base-entity';
import { Currency } from './currency';

export interface Equity extends BaseEntity {
  name: string;
  symbol: string;
  type: string;
  isin: string;
  currency: Currency;
}
