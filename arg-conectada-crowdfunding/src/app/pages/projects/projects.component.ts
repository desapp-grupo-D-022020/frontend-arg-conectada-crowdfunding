import { Component, OnInit } from '@angular/core';
import {Project} from '../../models/project';
import { ProjectService } from '../../services/project.service';
declare var $ : any;

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  
  projects: Project[];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects()
        .subscribe(projects => this.projects = projects);
  }
  
  collapse():void{
    $('.navbar-collapse').collapse('hide');
  }

}
