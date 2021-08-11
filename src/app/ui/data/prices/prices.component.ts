import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseTableComponent } from '../../base/base-table.component';
import { FormControl, Validators } from '@angular/forms';
import { Price } from 'src/app/model/price';
import { PriceDatasource } from 'src/app/data/price-datasource';
import { PriceService } from 'src/app/service/price-service';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';
import { EquityService } from 'src/app/service/equity-service';
import { Equity } from 'src/app/model/equity';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent extends BaseTableComponent<Price> implements OnInit {

  dataSource: PriceDatasource;
  cols: string[] = ['date', 'rate']
  equities: Equity[];
  equity: Equity;
  fcEquity = new FormControl('', [Validators.required]);

  constructor(private service: PriceService, private equityService: EquityService, private dialog: MatDialog) {
	super();
  }

  ngOnInit(): void {
	this.dataSource = new PriceDatasource(this.service);
	this.equityService.findAll().subscribe(
	data => {
		this.equities = data;
	},
	error => {
		const dialogConfig = this.getDialogConfig();
		dialogConfig.data = { errorMessage: error }
		this.dialog.open(ErrorDialogComponent, dialogConfig);
	});
  }

  onEquitySelected(equity: Equity) {
	this.equity = equity;
	this.service.findAllByEquity(equity).subscribe(
		data => {
      this.dataSource.setData(data)
    },error => {
      const dialogConfig = this.getDialogConfig();
      dialogConfig.data = { errorMessage: error }
      this.dialog.open(ErrorDialogComponent, dialogConfig);
    });
  }

  onSubmitEvent(entity: Price) {
	this.service.addOrUpdate(entity).subscribe(
		(entity: Price) => {
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

}
