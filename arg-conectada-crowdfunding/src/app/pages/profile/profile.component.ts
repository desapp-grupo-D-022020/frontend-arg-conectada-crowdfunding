import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { Donation } from 'src/app/models/donation';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { DonationService } from 'src/app/services/donation.service';
import { ViewChild } from '@angular/core';
declare var $ : any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('file') fileInput;
  $user: Observable<User>;
  $donations: Observable<Donation[]>;
  info_file: string;
  role: string;
  form: FormGroup;
  haveFile: boolean;
  

  constructor(private tokenService: TokenService, private userService: UserService,
    private donationService: DonationService, private fb:FormBuilder) { }


  getField(fieldName:string) {
    return this.form.get(fieldName);
  }
  
  getFieldValue(fieldName:string) {
    return this.form.get(fieldName).value;
  }

  ngOnInit(): void {
    this.getUser();
    this.getDonations();
    this.role = this.tokenService.getRoleUser();
    this.info_file = "no attachment";
    this.haveFile = false;

    this.form = this.fb.group({
      file: ['']
      }
    );
  }

  getUser(): void {
    this.$user = this.userService.getUser(this.tokenService.getUserId());
  }

  getDonations(): void {
    this.$donations = this.donationService.getDonationsFromUser(this.tokenService.getUserId());
  }

  onFileChanged() {
    if (this.fileInput.nativeElement.files.length > 0) {
      const file = this.fileInput.nativeElement.files[0];
      this.info_file = file.name;
      this.appendFile(file, file.name);
      this.haveFile = true;
    }
    else{ 
      this.info_file = "no attachment";
      this.haveFile = false;
    }
  }

  appendFile(Appendfile: File, infoFile: string){
    this.info_file = infoFile;
    this.form.patchValue({
      file: Appendfile
    });
  }

  alert(message: string, tipo: SweetAlertIcon, time: number){
    Swal.fire({
      position: 'center',
      icon: tipo,
      title: message,
      background:'#00aae4',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: time,
      allowOutsideClick: false
    });
    this.styleAlert();
  }

  styleAlert(){
    $(".swal2-title").css('color', 'white')
    $(".swal2-modal").css('border', '3px solid black');
  }

  formReset(){
    this.form.reset();
    this.info_file = "no attachment";
    this.haveFile = false;
  }

  onSubmit(){
    const formData = new FormData();
    formData.append('img', this.getFieldValue('file'));
    formData.append('userId', `${this.tokenService.getUserId()}`);
    this.userService.changeUserPicture(formData)
    .subscribe(
      response => { this.alert('Image changed successfully!', 'success', 2800), console.log('Success!', response) }, 
      error => { this.alert('Failed to change profile picture! Excuse me, please try again later', 'error', 3500), console.log('Error!', error) },
    );
    this.formReset();
    setTimeout(()=>{ location.reload(); }, 3500)
  } 

}
