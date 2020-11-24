import { Injectable } from '@angular/core';
import { WebAuth } from 'auth0-js';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';

@Injectable({
  providedIn: 'root'
})

export class OAuthService {

  auth0: WebAuth;

  constructor(private router: Router) {
    this.auth0 = new auth0.WebAuth({
      domain: 'dev-kzju2daw.auth0.com',
      clientID: 'ZtL15vsZ4fj8yvlS5k560eVbGJb2aRsb',
      responseType: 'token id_token',
      audience: 'https://dev-kzju2daw.auth0.com/api/v2/',
      redirectUri: `${window.location.origin}`,
      scope: 'openid'
    });
    this.handleAuthentication();
  }

  public login() {
    this.auth0.authorize();
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
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('isLoggedIn');
    this.auth0.logout({
      returnTo: `${window.location.origin}`,
      clientID: 'ZtL15vsZ4fj8yvlS5k560eVbGJb2aRsb'
    });
  }

  public isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expiresAt'));
    return new Date().getTime() < expiresAt;
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

  getProfile(cb) {
    if (window.location.hash) {
        this.auth0.parseHash({ hash: window.location.hash }, (err, authResult) => {
        if (err) {
          return console.log('parseHash error', err)
        }
        if (authResult) {
          this.auth0.client.userInfo(authResult.accessToken, function(err, user) {
            if (err) {
              console.log('err accessToken', err)
            }
            localStorage.setItem('profile', JSON.stringify(user))
            localStorage.setItem('id_token', authResult.idToken)
            location.href = '/state';
          })
        }
      })
    }
  }

  setSession(authResult) {
    console.log({ authResult });
    if (authResult && authResult.accessToken && authResult.idToken) {
      // Set the time that the access token will expire at
      const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('accessToken', authResult.accessToken);
      localStorage.setItem('idToken', authResult.idToken);
      localStorage.setItem('expiresAt', expiresAt);
      this.getProfile((err, profile) => {
        if (err) {
          throw new Error(err);
        }
        this.router.navigate(['/']);
      });
    }
  }

}
