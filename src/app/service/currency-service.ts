import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base-service';
import { Currency } from '../model/currency';

@Injectable()
export class CurrencyService extends BaseService<Currency> {
	
	constructor(http: HttpClient) {
		super(http);
	}
	
	public findAll(): Observable<Currency[]> {
		return super.findAll('/currencies');
	}
	
	public addOrUpdate(currency: Currency): Observable<Currency> {
		return this.http.post<Currency>(this.baseUrl + '/currency/update', currency).pipe(
			catchError(err => { 
				console.error(err)
				return throwError(err); })
	    );
  	}

	public delete(currency: Currency): Observable<Object> {
    	return super.delete(currency, '/currency/delete');
  	}
}