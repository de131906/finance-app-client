import { DataSource } from "@angular/cdk/collections";
import { BaseDataSource } from "./base-datasource";
import { ClearingAccount } from "../model/clearingaccount";
import { ClearingService } from "../service/clearing-service";

export class ClearingDatasource extends BaseDataSource<ClearingAccount> implements DataSource<ClearingAccount> {

	constructor(clearingService: ClearingService) {
		super();
    }

}
