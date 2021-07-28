import { DataSource } from "@angular/cdk/collections";
import { Transaction } from '../model/transaction';
import { TransactionService } from '../service/transaction-service';
import { BaseDataSource } from "./base-datasource";

export class TransactionDatasource extends BaseDataSource<Transaction> implements DataSource<Transaction> {

	constructor(service: TransactionService) {
		super();
    }

}
