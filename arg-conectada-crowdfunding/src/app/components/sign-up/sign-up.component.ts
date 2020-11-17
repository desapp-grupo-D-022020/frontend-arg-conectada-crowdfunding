import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NewUser } from '../../models/new-user';
import { Location } from '@angular/common';
import Swal, { SweetAlertIcon } from 'sweetalert2';
declare var $ : any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  private user: any = {};
  isRegister = false;
  isRegisterFail = false;
  errorMsg = '';

  constructor(private fb:FormBuilder, private authService: AuthService,
              private location:Location) { }

  /**
   * Retorna el valor del campo del formulario con el mismo nombre que el pasado por parámetro
  */
  getFieldValue(fieldName:string) {
    return this.form.get(fieldName).value;
  }

  /**
   * Retorna el campo del formulario con el mismo nombre que el pasado por parámetro
  */
 getField(fieldName:string) {
  return this.form.get(fieldName);
}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      userName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, 
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  onRegister() {
    this.user = new NewUser( this.getFieldValue('name'), this.getFieldValue('userName'), 
                             this.getFieldValue('email'), this.getFieldValue('password'));
    this.authService.registry(this.user).subscribe(data => {
      this.isRegister = true;
      this.isRegisterFail = false;
      this.alert('Usuario registrado exitosamente!', 'success', 2800), console.log('Success!', data);
    },
      (error: any) => {
        this.errorMsg = error.error.message;
        this.isRegister = false;
        this.isRegisterFail = true;
        error => { this.alert('Error al registrar el usuario! Disculpe, vuelva a intentarlo más tarde', 'error', 3500),
                   console.log(error.error.message) }
      }
    );
    this.resetContactForm();
    setTimeout(()=>{ this.goBack(); }, 3500)
  }

  resetContactForm(){
    this.form.reset();
  }

  goBack(): void {
    location.href = location.origin;
  }

  /**
   * Muestra una alerta de exito con el mensaje pasado como parámetro
   * @param message el mensaje a mostrar
   * @param tipo el tipo de la alerta
   */
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

  /**
  * Ejecuta sentencias jQuery que modifican los estilos de las alertas de error y exito
  */
  styleAlert(){
    $(".swal2-title").css('color', 'white')
    $(".swal2-modal").css('border', '3px solid black');
  }

  /**
  * Bloquea al caracter pasado por parámetro si el mismo no es una latra.
  * @param e un caracter pasado por parámetro.
  */
  onlyletters(e){
    let key = e.keyCode || e.which;
    let tecla = String.fromCharCode(key).toLowerCase();
    let letras = "áéíóúabcdefghijklmnñopqrstuvwxyz";
 
    if(letras.indexOf(tecla)==-1){
      e.preventDefault();
    }
  }

}
