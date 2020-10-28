import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectsUrl = 'api/projects';  // URL to web api

  constructor(private http: HttpClient) { }

  /** GET projects from the server */
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl)
    .pipe(
      tap(_ => this.log('fetched projects')),
      catchError(this.handleError<Project[]>('getProjects', []))
    );
  }

  getProject(id: number): Observable<Project> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http.get<Project>(url).pipe(
      tap(_ => this.log(`fetched project id=${id}`)),
      catchError(this.handleError<Project>(`getProject id=${id}`))
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
    //TODO: implement message service? this.messageService.add(`ProjectService: ${message}`);
  }
}
