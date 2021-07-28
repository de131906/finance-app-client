import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base-service';
import { Account } from '../model/account';
import { Transaction } from '../model/transaction';
import { ClearingAccount } from '../model/clearingaccount';

@Injectable()
export class TransactionService extends BaseService<Transaction> {
	
	constructor(http: HttpClient) {
		super(http);
	}
	
	public findAllByBankAccount(account: Account):  Observable<Transaction[]> {
		return this.http.get<Transaction[]>(this.baseUrl + '/account/trx' + '?accountId=' + account.id);
	}
	
  public addOrUpdate(trx: Transaction, counterAccount?: Account, clearingAccount?: ClearingAccount): Observable<Transaction> {
		let dto = { transaction: trx, counterAccount: counterAccount, clearingAccount: clearingAccount };
		return this.http.post<Transaction>(this.baseUrl + '/account/trx/update', dto).pipe(
		catchError(err => { 
			console.error(err)
			return throwError(err); })
    );
  }

  public upload(formData: FormData):  Observable<Transaction[]> {
	const options = {
	  headers: new HttpHeaders({
	    'enctype': 'multipart/form-data'
	  }),
	  body: formData
	};
	return this.http.post<Transaction[]>(this.baseUrl + '/account/trx/upload', formData).pipe(
		catchError(err => { 
			console.error(err)
			return throwError(err); })
    );
  }
}