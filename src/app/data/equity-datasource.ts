import { DataSource } from "@angular/cdk/collections";
import { BaseDataSource } from "./base-datasource";
import { Equity } from "../model/equity";
import { EquityService } from "../service/equity-service";

export class EquityDatasource extends BaseDataSource<Equity> implements DataSource<Equity> {

	constructor(service: EquityService) {
		super();
    }

}
