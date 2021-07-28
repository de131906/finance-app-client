import { DataSource } from "@angular/cdk/collections";
import { BaseDataSource } from "./base-datasource";
import { InvestTransaction } from "../model/invest-transaction";
import { InvestTransactionService } from "../service/invest-transaction-service";

export class InvestTransactionDatasource extends BaseDataSource<InvestTransaction> implements DataSource<InvestTransaction> {

	constructor(service: InvestTransactionService) {
		super();
    }

}
