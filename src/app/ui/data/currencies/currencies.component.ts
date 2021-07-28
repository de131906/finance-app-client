import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseTableComponent } from '../../base/base-table.component';
import { Currency } from 'src/app/model/currency';
import { CurrencyDatasource } from 'src/app/data/currency-datasource';
import { CurrencyService } from 'src/app/service/currency-service';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent extends BaseTableComponent<Currency> implements OnInit {

  dataSource: CurrencyDatasource;
  cols: string[] = ['symbol', 'name']

  constructor(private service: CurrencyService, private dialog: MatDialog) {
	super();
  }

  ngOnInit(): void {
	this.dataSource = new CurrencyDatasource(this.service);
	this.service.findAll().subscribe(
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
	)
  }

  onSubmitEvent(entity: Currency) {
	this.service.addOrUpdate(entity).subscribe(
		(entity: Currency) => {
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
