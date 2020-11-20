import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  $user: Observable<User>;
  role: string;
  roles: string[] = [];

  constructor(private tokenService: TokenService, private userService: UserService) { }

  ngOnInit(): void {
    this.getUser();
    this.roles = this.tokenService.getAuthorities();
    this.roles.every(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.role = 'Admin';
      }
      this.role = 'User';
    });
  }

  getUser(): void {
    this.$user = this.userService.getUser(this.tokenService.getUserId());
  }
}
