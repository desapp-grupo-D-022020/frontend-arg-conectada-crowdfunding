import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private projectsUrl = `${environment.urlApi}/user`;  // URL to web api

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<User> {
    const url = `${this.projectsUrl}/getUserDTO/${id}`;
    return this.http.get<User>(url);
  }
}
