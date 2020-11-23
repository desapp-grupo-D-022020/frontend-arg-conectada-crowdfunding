import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Donation } from '../models/donation';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  private projectsUrl = `${environment.urlApi}/donations`;  // URL to web api

  constructor(private http: HttpClient) { }

  getDonationsFromUser(page: number, id: number): Observable<any> {
    const url = `${this.projectsUrl}/getDonationsFromUser/${id}?` + `page=${page}`;
    return this.http.get<any>(url).pipe(
      tap(_ => this.log(`fetched donation id=${id}`)),
      catchError(this.handleError<any>(`getDonation id=${id}`))
    );
  }

  /**
    * Handle Http operation that failed.
    * Let the app continue.
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
  */
 private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

  // TODO: send the error to remote logging infrastructure
  console.error(error); // log to console instead

  // TODO: better job of transforming error for user consumption
  this.log(`${operation} failed: ${error.message}`);

  // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

/** Log a HeroService message with the MessageService */
private log(message: string) {
  console.log(message);
}

}
