import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BaseTableComponent } from '../base/base-table.component';
import { Account } from '../../model/account';
import { Transaction } from '../../model/transaction';
import { TransactionDatasource } from 'src/app/data/transaction-datasource';
import { TransactionService } from '../../service/transaction-service';
import { AccountService } from 'src/app/service/account-service';
import { map, mergeMap, take } from 'rxjs/operators';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { AccountTransactionUploadComponent } from '../account-transaction-upload/account-transaction-upload.component';

@Component({
  selector: 'app-account-transactions',
  templateUrl: './account-transactions.component.html',
  styleUrls: ['./account-transactions.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AccountTransactionsComponent extends BaseTableComponent<Transaction> implements OnInit {

  queryUid: string;
  dataSource: TransactionDatasource;
  cols = ['date', 'reference', 'type', 'amount'];
  totalAmount: number = 0;
  account: Account;

  constructor(actRoute: ActivatedRoute, 
    private trxService: TransactionService, 
    private accountService: AccountService, private dialog: MatDialog) {
	super();
	actRoute.queryParams.subscribe(
      params => {
		this.queryUid = params['uid'];
      }
    );
  }

  ngOnInit(): void {
    this.dataSource = new TransactionDatasource(this.trxService);
	this.accountService.findAccount(this.queryUid).pipe(
		mergeMap(account => {
			this.account = account;
			this.totalAmount = account.balance
			return this.trxService.findAllByBankAccount(account).pipe(
				map(trxs =>{ return trxs })	
			);
		})
	).subscribe((data: Transaction[]) => {
		this.dataSource.setData(data)
	}, 
	error => {
		console.error(error);
		const dialogConfig = this.getDialogConfig();
		dialogConfig.data = { errorMessage: error }
		this.dialog.open(ErrorDialogComponent, dialogConfig);
	});
  }

  onSubmitEvent(dto: Map<string, any>) {
	this.trxService.addOrUpdate(dto.get('transaction'), dto.get('counteraccount'), dto.get('clearingaccount')).subscribe(
		(entity: Transaction) => {
			this.dataSource.addOrUpdate(entity);
			this.onRowClicked(entity);
		},
		error => {
			console.error(error);
			const dialogConfig = this.getDialogConfig();
			dialogConfig.data = { errorMessage: error }
			this.dialog.open(ErrorDialogComponent, dialogConfig);
		}
	)
	this.showEditArea = false;
  }

  onUploadClicked() {
	let dialogConfig: MatDialogConfig = this.getDialogConfig();
	dialogConfig.data = { account: this.account }
	let dialogRef: MatDialogRef<AccountTransactionUploadComponent> = this.dialog.open(AccountTransactionUploadComponent, dialogConfig);
	dialogRef.afterClosed().pipe(take(1), map(trxs => { return trxs; })).subscribe(
		(transactions: Transaction[]) => {
			this.addToDataSource(transactions);
		}
	);
  }

  private addToDataSource(transactions: Transaction[]): void {
	for (let entity of transactions) {
		this.dataSource.addOrUpdate(entity);
	}
  }
  
}
