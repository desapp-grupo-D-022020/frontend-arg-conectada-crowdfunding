import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal, { SweetAlertIcon } from 'sweetalert2';
declare var $ : any;

import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../services/project.service';
import { Project } from 'src/app/models/project';


@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit {

  project: Project;

  donationForm: FormGroup;
  
  constructor(
    private fb:FormBuilder,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private location: Location
  ) { }

  /**
   * Retorna el campo del formulario con el mismo nombre que el pasado por parámetro
  */
  getField(fieldName:string) {
    return this.donationForm.get(fieldName);
  }

  /**
   * Retorna el valor del campo del formulario con el mismo nombre que el pasado por parámetro
  */
  getFieldValue(fieldName:string) {
    return this.donationForm.get(fieldName).value;
  }

  ngOnInit(): void {
    this.getProject();

    this.donationForm = this.fb.group({
      amount: ['', Validators.required],
      comment: ['', [Validators.required, Validators.minLength(5)]]
      })
  }

  onSubmit(){

    //this.contactService.validationCode(formValidationCode).subscribe();
    //this.validationCodeForm.reset();
  } 

  buildDataContact(){
    const formData = new FormData();
    this.getFieldValue('phoneNumber')? formData.append('phoneNumber', this.getFieldValue('phoneNumber')): formData.append('phoneNumber', "Sin Número");
    formData.append('body', this.getFieldValue('body'));
 
    this.projectService.donation(formData)
     .subscribe(
       response => { this.alert('Donación realizada exitosamente!', 'success', 2500), console.log('Success!', response) },
       error => { this.alert('Error al realizar la donación! Disculpe, vuelva a intentarlo más tarde', 'error', 2500), console.log('Error!', error) },
    );
    this.loadingAlert();
    this.resetContactForm();
  }

  resetContactForm(){
    this.donationForm.reset();
  }

  getProject(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.projectService.getProject(id)
      .subscribe(project => this.project = project);
  }

  goBack(): void {
    this.location.back();
  }

    /**
   * Muestra una alerta de carga en la view
   */
  loadingAlert(){
    Swal.fire({
      title: 'Procesando sus datos de contacto',
      timer: 8000,
      background:'#563d7c',
      allowOutsideClick: false,
      confirmButtonColor: '#43c2d0',
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    })
    this.styleAlert();
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
      background:'#563d7c',
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
   * Bloquea al caracter pasado por parámetro si el mismo no es un número.
   * @param e un caracter pasado por parámetro.
   */
  onlynumber(e){ 
    var key = e.keyCode || e.which;
    if (key < 48 || key > 57) {
        e.preventDefault();
    }
  }

  donate(): void {
    //TODO!
  }
}
