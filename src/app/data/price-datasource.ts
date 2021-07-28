import { DataSource } from "@angular/cdk/collections";
import { BaseDataSource } from "./base-datasource";
import { Price } from "../model/price";
import { PriceService } from "../service/price-service";

export class PriceDatasource extends BaseDataSource<Price> implements DataSource<Price> {

	constructor(service: PriceService) {
		super();
    }

}
