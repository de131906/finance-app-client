import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base-service';
import { Account } from '../model/account';

@Injectable()
export class AccountService extends BaseService<Account> {
	
	constructor(http: HttpClient) {
		super(http);
	}
	
	public findAll(): Observable<Account[]> {
		return super.findAll('/accounts');
	}
	
	public findAllBankAccounts(): Observable<Account[]> {
		return super.findAll('/accounts/bank');
	}
	
	public findAllInvestAccounts(): Observable<Account[]> {
		return super.findAll('/accounts/invest');
	}
	
	public findAllDepots(): Observable<Account[]> {
		return super.findAll('/accounts/depot');
	}
	
	public findBankAccount(accountId: string): Observable<Account> {
    	return this.http.get<Account>(this.baseUrl +  '/account/bank?accountId=' + accountId);
	}
	
	public findAccount(accountId: string): Observable<Account> {
    	return this.http.get<Account>(this.baseUrl +  '/account?accountId=' + accountId);
	}
	
	public addOrUpdate(account: Account): Observable<Account> {
		return this.http.post<Account>(this.baseUrl + '/account/update', account).pipe(
			catchError(err => { 
				console.error(err)
				return throwError(err); })
	    );
  	}

	public delete(account: Account): Observable<Object> {
    	return super.delete(account, '/account/delete');
  	}
}