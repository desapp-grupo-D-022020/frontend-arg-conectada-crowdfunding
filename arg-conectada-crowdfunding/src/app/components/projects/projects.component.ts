import { Component, OnInit } from '@angular/core';
import {Project} from '../../models/project';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  
  openProjects: Project[];

  nearlyClosedProjects: Project[];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getOpenProjects();
    this.getNearlyClosedProjects();
  }

  getOpenProjects(): void {
    this.projectService.getOpenProjects()
        .subscribe(projects => this.openProjects = projects);
  }

  getNearlyClosedProjects(): void {
    this.projectService.getNearlyClosedProjects()
    .subscribe(projects => this.nearlyClosedProjects = projects);
  }
}
