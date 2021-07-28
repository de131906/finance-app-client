import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base-service';
import { Investment } from '../model/investment';
import { Account } from '../model/account';

@Injectable()
export class InvestmentService extends BaseService<Investment> {

  constructor(http: HttpClient) {
		super(http);
  }

  public findAllByDepot(depot: Account): Observable<Investment[]> {
    return this.http.get<Investment[]>(this.baseUrl + '/investments', {
		params: { depotId: depot.id }
    });
  }

	public findInvestment(investId: string): Observable<Investment> {
    	return this.http.get<Investment>(this.baseUrl +  '/investment', {
			params: { investId: investId }
    	});
	}

  public addOrUpdate(account: Investment): Observable<Investment> {
		return this.http.post<Investment>(this.baseUrl + '/investment/update', account).pipe(
			catchError(err => { 
				console.error(err)
				return throwError(err); })
	    );
  	}
}
