import { Component, OnInit } from '@angular/core';
import {Project} from '../../project';
import { ProjectService } from '../../services/project.service';
declare var $ : any;

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  
  projects: Project[];
  //selectedProject: Project;
  displayedColumns: string[] = ['id','name','province','conectivity','raised','pct_left_to_reach_goal'];
  dataSource = this.getProjects();

  constructor(private projectService: ProjectService) { }


  // onSelect(project: Project): void {
  //   this.selectedProject = project;
  // }

  getProjects(): void {
    this.projectService.getProjects()
        .subscribe(projects => this.projects = projects);
  }

  ngOnInit(): void {
    this.getProjects();
  }
  
  collapse():void{
    $('.navbar-collapse').collapse('hide');
  }

}
