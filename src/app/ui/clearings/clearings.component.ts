import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClearingDatasource } from 'src/app/data/clearing-datasource';
import { ClearingAccount } from 'src/app/model/clearingaccount';
import { ClearingService } from 'src/app/service/clearing-service';
import { BaseTableComponent } from '../base/base-table.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-clearings',
  templateUrl: './clearings.component.html',
  styleUrls: ['./clearings.component.css']
})
export class ClearingsComponent extends BaseTableComponent<ClearingAccount> implements OnInit {

  dataSource: ClearingDatasource;
  cols: string[] = ['name', 'type', 'balance', 'currency']
  totalIncome: number = 0;
  totalExpense: number = 0;

  constructor(private service: ClearingService, private dialog: MatDialog) {
	super();
  }

  ngOnInit(): void {
	this.dataSource = new ClearingDatasource(this.service);
	this.service.findAll().subscribe(
	(data: ClearingAccount[]) => {
		this.dataSource.setData(data);
		this.calculateTotals(data);
	},
	error => {
		const dialogConfig = this.getDialogConfig();
		dialogConfig.data = { errorMessage: error }
		this.dialog.open(ErrorDialogComponent, dialogConfig);
	});
  }

  onDeleteClicked() {}

  onSubmitEvent(entity: ClearingAccount) {
	this.service.addOrUpdate(entity).subscribe(
		(entity: ClearingAccount) => {
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

  private calculateTotals(accounts: ClearingAccount[]): void {
	accounts.forEach((account: ClearingAccount) => {
		if (account.accountType === 'INCOME') {
			this.totalIncome += account.balance
		} else if (account.accountType === 'EXPENSE') {
			this.totalExpense += account.balance
		}
	})
  }
}
