import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';

@Injectable({
  providedIn: 'root'
})
export class OAuthService {

  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;
  userProfile: any;

  auth0 = new auth0.WebAuth({
    domain:       'dev-kzju2daw.auth0.com',
    clientID:     'ZtL15vsZ4fj8yvlS5k560eVbGJb2aRsb',
    responseType: 'token id_token',
    audience: 'https://dev-kzju2daw.auth0.com/api/v2/',
    redirectUri: 'http://localhost:4200/',
    scope: 'openid',
    leeway: 10
  });

  constructor(public router: Router) {
    this._idToken = '';
    this._accessToken = '';
    this._expiresAt = 0;
   }

  public loginGoogle() {
    this.auth0.authorize({
      connection: 'google-oauth2'
    });
  }

  public loginFacebook() {
    this.auth0.authorize({
      connection: 'facebook'
    });
  }

  public loginTwitter() {
    this.auth0.authorize({
      connection: 'twitter'
    });
  }

  public logout(): void {
    this._accessToken = '';
    this._idToken = '';
    this._expiresAt = 0;
    localStorage.removeItem('isLoggedIn');
    this.auth0.logout({
      returnTo: 'http://localhost:4200',
      clientID: 'ZtL15vsZ4fj8yvlS5k560eVbGJb2aRsb'
    });
  }

  public isAuthenticated(): boolean {
    return new Date().getTime() < this._expiresAt;
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get idToken(): string {
    return this._idToken;
  }

  private setSession(authResult): void {
    localStorage.setItem('isLoggedIn', 'true');
    const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = expiresAt;
  }

  public renewSession(): void {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
        this.logout();
      }
    });
  }
}