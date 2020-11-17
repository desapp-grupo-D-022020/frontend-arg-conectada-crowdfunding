import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  roles: string[] = [];

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
    this.roles = this.tokenService.getAuthorities();
  }

}
