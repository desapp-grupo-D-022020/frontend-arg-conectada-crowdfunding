import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  info: any = {};

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    this.info = {
      token: this.tokenService.getToken(),
      userName: this.tokenService.getUser(),
      authorities: this.tokenService.getAuthorities()
    };
  }

}