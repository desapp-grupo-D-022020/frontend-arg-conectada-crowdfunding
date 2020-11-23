import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewProject } from '../../models/new-project';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { ProjectService } from 'src/app/services/project.service';
import { Place } from 'src/app/models/place';
import { PlaceService } from 'src/app/services/place.service';
declare var $ : any;


@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  form: FormGroup;
  rangePercentageForClose: number[];
  places: Place[];
  errorMsg = '';

  constructor(private fb: FormBuilder, private projectService: ProjectService,
    private placeService: PlaceService) { }

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
    this.getPlaces();
    this.rangePercentageForClose = this.generateRangeOfNumbers(50, 101);
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(8)]],
      placeId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      factor: ['', Validators.max(100000)],
      percentageForClose: ['']
    })
  }

  onSubmit() {
    const formData = new FormData();

    this.getFieldValue('factor')? formData.append('factor', this.getFieldValue('factor')): formData.append('factor', "1000");
    this.getFieldValue('percentageForClose')? formData.append('percentageForClose', this.getFieldValue('percentageForClose')):
     formData.append('percentageForClose', "100");
    formData.append('placeId', this.getFieldValue('placeId'));
    formData.append('name', this.getFieldValue('name'));
    formData.append('startDate', this.getFieldValue('startDate'));
    formData.append('endDate', this.getFieldValue('endDate'));

    this.projectService.createProject(formData).subscribe(
      response => { this.alert('Proyecto creado exitosamente!', 'success', 2800), console.log('Success!', response) },
      error => { this.alert('Error al crear el proyecto! Disculpe, vuelva a intentarlo más tarde', 'error', 3500), console.log('Error!', error) },     
    );
    this.resetContactForm();
    setTimeout(()=>{ this.goBack(); }, 3500)
  }

  resetContactForm(){
    this.form.reset();
  }

  goBack(): void {
    location.href = `${location.origin}/#projects`;
  }

  getPlaces(): void {
    this.placeService.getPlacesWithoutProject().subscribe(
      places => this.places = places
    );
  }
  
  generateRangeOfNumbers(start: number, end: number) {
    const range: number[] = [];
    for (var i = start; i < end; i++) {
      range.push(i);
    }
    return range;
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

  /**
  * Bloquea al caracter pasado por parámetro si el mismo no es una latra.
  * @param e un caracter pasado por parámetro.
  */
  onlyletters(e){
    let key = e.keyCode || e.which;
    let tecla = String.fromCharCode(key).toLowerCase();
    let letras = "áéíóúabcdefghijklmnñopqrstuvwxyz ";
 
    if(letras.indexOf(tecla)==-1){
      e.preventDefault();
    }
  }

  onlynumber(e){ 
    var key = e.keyCode || e.which;
    if (key < 48 || key > 57) {
        e.preventDefault();
    }
  }
}
