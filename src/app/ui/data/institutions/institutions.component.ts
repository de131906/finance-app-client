import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InstitutionDatasource } from 'src/app/data/institution-datasource';
import { Institution } from 'src/app/model/institution';
import { InstitutionService } from 'src/app/service/institution-service';
import { BaseTableComponent } from '../../base/base-table.component';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';

@Component({
  selector: 'app-institutions',
  templateUrl: './institutions.component.html',
  styleUrls: ['./institutions.component.css']
})
export class InstitutionsComponent extends BaseTableComponent<Institution> implements OnInit {
	
  dataSource: InstitutionDatasource;
  cols: string[] = ['bic', 'name']

  constructor(private service: InstitutionService, private dialog: MatDialog) {
	super();
  }

  ngOnInit(): void {
	this.dataSource = new InstitutionDatasource(this.service);
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
  
  onSubmitEvent(entity: Institution) {
	console.info(entity)
	this.service.addOrUpdate(entity).subscribe(
		(entity: Institution) => {
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
  onCancelEvent(event: string) {
	if (event === 'cancel') { this.showEditArea = false }
  }

}
