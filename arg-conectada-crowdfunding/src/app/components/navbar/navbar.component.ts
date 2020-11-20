import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
declare var $ : any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User;
  isLogin = false;
  roles: string[];
  authority: string;

  constructor(private tokenService: TokenService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.getUser();
      this.isLogin = true;
      this.roles = [];
      this.roles = this.tokenService.getAuthorities();
      this.roles.every(rol => {
        if (rol === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
  }

  logOut(): void {
    this.tokenService.logOut();
    this.isLogin = false;
    this.authority = '';
    this.router.navigate(['home']);
  }

  getUser(): void {
    this.userService.getUser(this.tokenService.getUserId())
        .subscribe(user => this.user = user);
  }

  collapse():void{
    $('.navbar-collapse').collapse('hide');
  }
}
