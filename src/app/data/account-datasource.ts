import { DataSource } from "@angular/cdk/collections";
import { Account } from '../model/account';
import { AccountService } from '../service/account-service';
import { BaseDataSource } from "./base-datasource";

export class AccountDatasource extends BaseDataSource<Account> implements DataSource<Account> {

	constructor(accountService: AccountService) {
		super();
    }

}
