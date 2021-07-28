import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base-service';
import { Price } from '../model/price';
import { Equity } from '../model/equity';

@Injectable()
export class PriceService extends BaseService<Price> {

  constructor(http: HttpClient) {
	super(http);
  }

  public findAllByEquity(equity: Equity): Observable<Price[]> {
	return this.http.get<Price[]>(this.baseUrl + '/prices', {
		params: { equityId: equity.id }
    });
  }

  public addOrUpdate(price: Price): Observable<Price> {
		return this.http.post<Price>(this.baseUrl + '/price/update', price).pipe(
		catchError(err => { 
			console.error(err)
			return throwError(err); })
    );
  }

  public delete(price: Price): Observable<Object> {
    	return super.delete(price, '/price/delete');
  	}

}
