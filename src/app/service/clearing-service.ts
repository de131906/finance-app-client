import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base-service';
import { ClearingAccount } from '../model/clearingaccount';

@Injectable()
export class ClearingService extends BaseService<ClearingAccount> {
	
	constructor(http: HttpClient) {
		super(http);
	}
	
	public findAll():  Observable<ClearingAccount[]> {
		return super.findAll('/accounts/clearing');
	}
	
	public addOrUpdate(account: ClearingAccount): Observable<ClearingAccount> {
		return this.http.post<ClearingAccount>(this.baseUrl + '/account/clearing/update', account).pipe(
			catchError(err => { 
				console.error(err)
				return throwError(err); })
	    );
  	}
}