import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base-service';
import { Equity } from '../model/equity';

@Injectable()
export class EquityService extends BaseService<Equity> {
	
	constructor(http: HttpClient) {
		super(http);
	}
	
	public findAll(): Observable<Equity[]> {
		return super.findAll('/equities');
	}
	
	public addOrUpdate(equity: Equity): Observable<Equity> {
		return this.http.post<Equity>(this.baseUrl + '/equity/update', equity).pipe(
			catchError(err => { 
				console.error(err)
				return throwError(err); })
	    );
  	}

	public delete(equity: Equity): Observable<Object> {
    	return super.delete(equity, '/equity/delete');
  	}
	
}