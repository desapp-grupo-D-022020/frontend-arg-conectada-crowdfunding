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

  projectId: number;

  donationForm: FormGroup;
  
  constructor(
    private fb:FormBuilder,
    private route: ActivatedRoute,
    private projectService: ProjectService
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
    this.projectId = +this.route.snapshot.paramMap.get('id');
    
    this.getProject();

    this.donationForm = this.fb.group({
      amount: ['', Validators.required],
      comment: ['', [Validators.required, Validators.minLength(5)]]
      })
  }

  onSubmit(){
    const formData = new FormData();
    formData.append('projectId', `${this.projectId}`);
    formData.append('userId', '1');
    formData.append('amount', this.getFieldValue('amount'));
    formData.append('comment', this.getFieldValue('comment'));
 
    this.projectService.donation(formData)
     .subscribe(
       response => { this.alert('Donación realizada exitosamente!', 'success', 2800), console.log('Success!', response) },
       error => { this.alert('Error al realizar la donación! Disculpe, vuelva a intentarlo más tarde', 'error', 3500), console.log('Error!', error) },
    );
    this.resetContactForm();
    this.goBack();
  }

  resetContactForm(){
    this.donationForm.reset();
  }

  getProject(): void {
    this.projectService.getProject(this.projectId)
      .subscribe(project => this.project = project);
  }

  goBack(): void {
    location.href = `${location.origin}/#projects`;
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
   * Bloquea al caracter pasado por parámetro si el mismo no es un número.
   * @param e un caracter pasado por parámetro.
   */
  onlynumber(e){ 
    var key = e.keyCode || e.which;
    if (key < 48 || key > 57) {
        e.preventDefault();
    }
  }
}
