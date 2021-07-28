import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base-service';
import { Institution } from '../model/institution';

@Injectable()
export class InstitutionService extends BaseService<Institution> {
	
	constructor(http: HttpClient) {
		super(http);
	}
	
	public findAll(): Observable<Institution[]> {
		return super.findAll('/institutions');
	}
	
	public addOrUpdate(institution: Institution): Observable<Institution> {
		return this.http.post<Institution>(this.baseUrl + '/institution/update', institution).pipe(
			catchError(err => { 
				console.error(err)
				return throwError(err); })
	    );
  	}

	public delete(institution: Institution): Observable<Object> {
    	return super.delete(institution, '/institution/delete');
  	}
}