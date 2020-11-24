import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { OAuthService } from '../../services/auth0.service';
declare var $ : any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  $user: Observable<User>;
  isLogin = false;
  roles: string[];
  authority: string;

  constructor(private tokenService: TokenService, 
    private userService: UserService, private router: Router, public auth: OAuthService) {
      this.auth.handleAuthentication();
     }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.getUser();
      this.isLogin = true;;
    }
  }

  logOut(): void {
    this.tokenService.logOut();
    this.isLogin = false;
    this.authority = '';
    this.router.navigate(['home']);
  }

  getUser(){
    this.$user = this.userService.getUser(this.tokenService.getUserId());
  }

  collapse():void{
    $('.navbar-collapse').collapse('hide');
  }
}
