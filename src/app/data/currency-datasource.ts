import { DataSource } from "@angular/cdk/collections";
import { Currency } from '../model/currency';
import { CurrencyService } from '../service/currency-service';
import { BaseDataSource } from "./base-datasource";

export class CurrencyDatasource extends BaseDataSource<Currency> implements DataSource<Currency> {

	constructor(currencyService: CurrencyService) {
		super();
    }

}
