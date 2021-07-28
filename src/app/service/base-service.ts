import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseEntity } from '../model/base-entity';

export abstract class BaseService<T extends BaseEntity> {
	
	baseUrl: string = 'http://localhost:8080';
//	baseUrl: string = 'http://159.122.179.156:30080';
	
	http: HttpClient;
	
	constructor(http: HttpClient) {
		this.http = http;
	}
	
	findAll(url: string): Observable<T[]> {
		return this.http.get<T[]>(this.baseUrl + url).pipe(
			catchError(err => { 
				console.error(err)
				return throwError(err); })
	    );
	}
	
	delete(dto: T, url: string): Observable<Object> {
		const options = {
	      headers: new HttpHeaders({
	        'Content-Type': 'application/json'
	      }),
	      body: dto
	    }
	    return this.http.delete<Object>(this.baseUrl + url, options).pipe(
			catchError(err => { 
				console.error(err)
				return throwError(err); })
	    );
	}
	
}