import { Injectable } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const USERID_KEY = 'AuthUserId';
const AUTHORITIES_KEY = 'AutAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];

  constructor(private userService: UserService) { }

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public setUserName(userName: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, userName);
  }

  public getUserName(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public setUserId(userId: number): void {
    window.sessionStorage.removeItem(USERID_KEY);
    window.sessionStorage.setItem(USERID_KEY, JSON.stringify(userId));
  }

  public getUserId(): number {
    return JSON.parse(sessionStorage.getItem(USERID_KEY));
  }

  public setAuthorities(authorities: string[]): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];
    if (sessionStorage.getItem(AUTHORITIES_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.authority);
      });
    }
    return this.roles;
  }

  public logOut(): void {
    window.sessionStorage.clear();
  }
}