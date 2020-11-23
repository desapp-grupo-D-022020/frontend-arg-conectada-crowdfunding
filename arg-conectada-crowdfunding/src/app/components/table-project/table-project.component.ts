import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { TokenService } from 'src/app/services/token.service';
import { Observable } from 'rxjs';
declare var $ : any;

@Component({
  selector: 'app-table-project',
  templateUrl: './table-project.component.html',
  styleUrls: ['./table-project.component.css']
})
export class TableProjectComponent implements OnInit {
  @Input() pagesProjects: Observable<any>;
  @Output() spreadPage = new EventEmitter<number>();

  isLogin = false;
  role: string;
  totalPages: Array<number>;
  page = 0;

  constructor(private projectService: ProjectService, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.loadProjects();
    if (this.tokenService.getToken()) {
      this.isLogin = true;;
      this.role = this.tokenService.getRoleUser();
    }
  }

  collapse():void{
    $('.navbar-collapse').collapse('hide');
  }

  loadProjects() {
    this.pagesProjects.subscribe(
      data => {
        this.totalPages = new Array(data['totalPages']);
      });
    }

  rewind(): void {
      this.page--;
      this.spreadPage.emit(this.page);
      console.log(this.page);
      this.loadProjects();
  }
  
  forward(): void {
      this.page++;
      this.spreadPage.emit(this.page);
      console.log(this.page);
      this.loadProjects();
  }
  
  setPage(page: number): void {
    this.page = page;
    this.spreadPage.emit(this.page);
    this.loadProjects();
  }

  closeProject(id:number){
    this.projectService.closeProject(id).subscribe(
      response => { this.alert('El proyecto a finalizado exitosamente!', 'success', 2800), console.log('Success!', response) },
      error => { this.alert('Error al intentar finalizar el proyecto! Disculpe, vuelva a intentarlo más tarde', 'error', 3500), console.log('Error!', error) },
    );
    setTimeout(()=>{ location.reload(); }, 3550)
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
}
