import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectsUrl = `${environment.urlApi}/projects`;  // URL to web api

  constructor(private http: HttpClient) { }

  /** GET projects from the server */
  getOpenProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.projectsUrl}/getOpenProjects`)
  }

  getNearlyClosedProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.projectsUrl}/getNearlyClosedProjects`)
  }


  getProject(id: number): Observable<Project> {
    const url = `${this.projectsUrl}/get/${id}`;
    return this.http.get<Project>(url).pipe(
      tap(_ => this.log(`fetched project id=${id}`)),
      catchError(this.handleError<Project>(`getProject id=${id}`))
    );
  }

  /**
   * Envia el formulario de contacto de la view del componente contact a 
   * la api para ser enviada por email
   * @param dataContact el formulario a enviar
   */
  donation(dataContact){
    const path = `${this.projectsUrl}/donate`;
    return this.http.put<any>(path, dataContact);
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
