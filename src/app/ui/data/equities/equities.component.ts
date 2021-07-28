import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseTableComponent } from '../../base/base-table.component';
import { Equity } from 'src/app/model/equity';
import { EquityDatasource } from 'src/app/data/equity-datasource';
import { EquityService } from 'src/app/service/equity-service';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';

@Component({
  selector: 'app-equities',
  templateUrl: './equities.component.html',
  styleUrls: ['./equities.component.css']
})
export class EquitiesComponent extends BaseTableComponent<Equity> implements OnInit {

  dataSource: EquityDatasource;
  cols: string[] = ['name', 'symbol', 'type', 'isin', 'currency']

  constructor(private service: EquityService, private dialog: MatDialog) {
	super();
  }

  ngOnInit(): void {
	this.dataSource = new EquityDatasource(this.service);
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

  onSubmitEvent(entity: Equity) {
	this.service.addOrUpdate(entity).subscribe(
		(entity: Equity) => {
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
