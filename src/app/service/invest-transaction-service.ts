import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base-service';
import { Investment } from '../model/investment';
import { InvestTransaction } from '../model/invest-transaction';
import { Account } from '../model/account';

@Injectable()
export class InvestTransactionService extends BaseService<InvestTransaction> {

  constructor(http: HttpClient) {
	super(http);
  }

  public findAllByInvestment(investment: Investment): Observable<InvestTransaction[]> {
	return this.http.get<InvestTransaction[]>(this.baseUrl + '/investment/trx', {
		params: { investId: investment.id }
    });
  }

  public addOrUpdate(trx: InvestTransaction, account: Account): Observable<InvestTransaction> {
	let dto = { transaction: trx, account: account };
		return this.http.post<InvestTransaction>(this.baseUrl + '/investment/trx/update', dto).pipe(
		catchError(err => { 
			console.error(err)
			return throwError(err); })
    );
  }

}
