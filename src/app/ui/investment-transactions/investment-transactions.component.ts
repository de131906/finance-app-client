import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { BaseTableComponent } from '../base/base-table.component';
import { Investment } from 'src/app/model/investment';
import { InvestTransaction } from 'src/app/model/invest-transaction';
import { InvestTransactionDatasource } from 'src/app/data/invest-transaction-datasource';
import { InvestTransactionService } from 'src/app/service/invest-transaction-service';
import { InvestmentService } from 'src/app/service/investment-service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-investment-transactions',
  templateUrl: './investment-transactions.component.html',
  styleUrls: ['./investment-transactions.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class InvestmentTransactionsComponent extends BaseTableComponent<InvestTransaction> implements OnInit {

  queryUid: string;
  dataSource: InvestTransactionDatasource;
  cols = ['date', 'reference', 'type', 'quantity', 'total'];
  investment: Investment;
  investmentName: string = ''

  constructor(actRoute: ActivatedRoute, private dialog: MatDialog,
	private trxService: InvestTransactionService, private investService: InvestmentService) {
	super();
	actRoute.queryParams.subscribe(
      params => {
		this.queryUid = params['uid'];
      }
    );
  }

  ngOnInit(): void {
	this.dataSource = new InvestTransactionDatasource(this.trxService);
	this.investService.findInvestment(this.queryUid).pipe(
		mergeMap(investment => {
			this.investment = investment;
			this.investmentName = investment.equity.name;
			return this.trxService.findAllByInvestment(investment).pipe(
				map(trxs =>{ return trxs })	
			);
		})
	).subscribe((data: InvestTransaction[]) => {
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
	this.trxService.addOrUpdate(dto.get('transaction'), dto.get('account')).subscribe(
		(entity: InvestTransaction) => {
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
