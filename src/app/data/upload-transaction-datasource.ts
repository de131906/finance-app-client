import { DataSource } from "@angular/cdk/collections";
import { UploadTransaction } from "../model/upload-transaction";
import { TransactionService } from '../service/transaction-service';
import { BaseDataSource } from "./base-datasource";

export class UploadTransactionDatasource extends BaseDataSource<UploadTransaction> implements DataSource<UploadTransaction> {

	constructor(service: TransactionService) {
		super();
    }

}
