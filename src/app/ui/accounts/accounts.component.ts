import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Account } from 'src/app/model/account';
import { AccountDatasource } from 'src/app/data/account-datasource';
import { AccountService } from 'src/app/service/account-service';
import { BaseTableComponent } from '../base/base-table.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent extends BaseTableComponent<Account> implements OnInit {

  dataSource: AccountDatasource;
  cols: string[] = ['name', 'type', 'institution', 'iban', 'balance', 'currency']

  constructor(private service: AccountService, private dialog: MatDialog) {
	super();
  }

  ngOnInit(): void {
	this.dataSource = new AccountDatasource(this.service);
	this.service.findAllBankAccounts().subscribe(
	data => {
		this.dataSource.setData(data);
	},
	error => {
		const dialogConfig = this.getDialogConfig();
		dialogConfig.data = { errorMessage: error }
		this.dialog.open(ErrorDialogComponent, dialogConfig);
	});
  }

  onDeleteClicked() {
	this.service.delete(this.selectedRow).subscribe(
		() => {
			this.dataSource.delete(this.selectedRow);
			this.onRowClicked(this.selectedRow);
		},
		error => {
			console.error(error);
			const dialogConfig = this.getDialogConfig();
			dialogConfig.data = { errorMessage: error }
			this.dialog.open(ErrorDialogComponent, dialogConfig);
		}
	);
  }
  
  onSubmitEvent(entity: Account) {
	this.service.addOrUpdate(entity).subscribe(
		(entity: Account) => {
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
  
}
