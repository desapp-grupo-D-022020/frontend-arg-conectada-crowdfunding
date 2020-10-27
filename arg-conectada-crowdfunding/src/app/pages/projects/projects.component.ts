import { Component, OnInit } from '@angular/core';

import {Project} from '../../project';
import { ProjectService } from '../../project.service';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  
  projects: Project[];
  selectedProject: Project;

  constructor(private projectService: ProjectService) { }

  onSelect(project: Project): void {
    this.selectedProject = project;
  }

  getProjects(): void {
    this.projectService.getProjects()
        .subscribe(projects => this.projects = projects);
  }

  ngOnInit(): void {
    this.getProjects();
  }

}
