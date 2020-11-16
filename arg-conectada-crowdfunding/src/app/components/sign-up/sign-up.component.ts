import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NewUser } from '../../models/new-user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form: any = {};
  private user: any = {};
  isRegister = false;
  isRegisterFail = false;
  errorMsg = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {}

  onRegister() {
    this.user = new NewUser(this.form.name, this.form.userName, this.form.email, this.form.password);
    this.authService.registry(this.user).subscribe(data => {
      this.isRegister = true;
      this.isRegisterFail = false;
    },
      (error: any) => {
        console.log(error.error.message);
        this.errorMsg = error.error.message;
        this.isRegister = false;
        this.isRegisterFail = true;
      }
    );
  }

}
