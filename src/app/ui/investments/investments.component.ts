import { Component, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { BaseTableComponent } from '../base/base-table.component';
import { FormControl, Validators } from '@angular/forms';
import { Investment } from 'src/app/model/investment';
import { InvestmentDatasource } from 'src/app/data/investment-datasource';
import { InvestmentService } from 'src/app/service/investment-service';
import { AccountService } from 'src/app/service/account-service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { Account } from 'src/app/model/account';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent extends BaseTableComponent<Investment> implements OnInit {

  dataSource: InvestmentDatasource;
  cols = ['equity', 'quantity', 'value', 'expenditure', 'earning', 'profit', 'yield'];
  totalCols = new Map([['value', 0], ['expenditure', 0], ['earning', 0], ['profit', 0], ['yield', 0]]);
  depots: Account[];
  depot: Account;
  fcDepot = new FormControl('', [Validators.required]);
  
  constructor(private service: InvestmentService, private accountService: AccountService, private dialog: MatDialog) {
	super();
  }

  ngOnInit(): void {
	this.dataSource = new InvestmentDatasource(this.service);
	this.fcDepot.valueChanges.subscribe((depot: Account) => { this.onDepotSelected(depot) })
	this.accountService.findAllDepots().subscribe(
	data => {
		this.depots = data;
		if (this.depots.length == 1) {
			this.fcDepot.setValue(this.depots[0])
			this.fcDepot.disable({emitEvent: false})
		}
	},
	error => {
		const dialogConfig = this.getDialogConfig();
		dialogConfig.data = { errorMessage: error }
		this.dialog.open(ErrorDialogComponent, dialogConfig);
	});
  }

  onDepotSelected(depot: Account) {
	this.depot = depot;
	this.service.findAllByDepot(depot).subscribe(
		data => { this.dataSource.setData(data), this.calculateTotals(data) }
	);
  }

  onDeleteClicked() {}

  onSubmitEvent(entity: Investment) {
	this.service.addOrUpdate(entity).subscribe(
		(entity: Investment) => {
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

  onSortData(sort: MatSort) {
	this.dataSource.sort(sort);
  }

  private calculateTotals(investments: Investment[]): void {
	let totalExpenditure: number = 0;
    let totalValue: number = 0;
    let totalEarning: number = 0;
	let totalProfit: number = 0;
	let totalYield: number = 0;
	investments.forEach((invest: Investment) => {
		totalValue += invest.value;
		totalExpenditure += invest.expenditure;
		totalEarning += invest.earning;
		totalProfit += invest.profit;
	})
	if (totalExpenditure > 0) {
		totalYield = (((totalExpenditure+totalProfit)*100)/totalExpenditure)-100;
	}
	this.totalCols.set('value', Number.parseFloat(totalValue.toFixed(2)))
	this.totalCols.set('expenditure', Number.parseFloat(totalExpenditure.toFixed(2)))
	this.totalCols.set('earning', Number.parseFloat(totalEarning.toFixed(2)))
	this.totalCols.set('profit', Number.parseFloat(totalProfit.toFixed(2)))
	this.totalCols.set('yield', Number.parseFloat(totalYield.toFixed(2)))
  }

}
