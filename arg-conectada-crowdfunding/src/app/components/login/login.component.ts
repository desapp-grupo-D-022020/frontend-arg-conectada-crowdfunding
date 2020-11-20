import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { UserLogin } from '../../models/user-login';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  form: any = {};
  user: UserLogin;
  isLogged = false;
  isLoginFail = false;
  roles: string[] = [];
  errorMsg = '';

  submitted: Boolean = false;
  error: {code: number, message: string} = null;

  constructor(private authService: AuthService, private tokenService: TokenService
              , private location:Location) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    this.user = new UserLogin(this.form.userName, this.form.password);
    this.authService.login(this.user).subscribe(data => {
      this.tokenService.setToken(data.token);
      this.tokenService.setUserName(data.userName);
      this.tokenService.setUserId(data.userId);
      this.tokenService.setAuthorities(data.authorities);
  
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
  
      this.goBack();
    },
      (error: any) => {
        console.log(error.error.message);
        this.errorMsg = error.error.message;
        this.isLogged = false;
        this.isLoginFail = true;
      }
    );
   }

  goBack(): void {
    this.location.back();
  }

}