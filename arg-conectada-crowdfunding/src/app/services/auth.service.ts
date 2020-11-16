import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserLogin } from '../models/user-login';
import { Observable } from 'rxjs';
import { JwtModel } from '../models/jwt-model';
import { NewUser } from '../models/new-user';

const head = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = `${environment.urlApi}/auth/`;

  constructor(private httpClient: HttpClient) { }
  
  public login(user: UserLogin): Observable<JwtModel> {
    return this.httpClient.post<JwtModel>(this.authURL + 'login', user, head);
  }
  
  public registry(user: NewUser): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'newUser', user, head);
  }
}


