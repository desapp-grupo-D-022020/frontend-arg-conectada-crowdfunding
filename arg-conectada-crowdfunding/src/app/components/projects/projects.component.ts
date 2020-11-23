import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  
  pagesOpenProjects: Observable<any>;
  pagesNearlyClosedProjects: Observable<any>;

  pageNumberOpenProjects: number = 0;

  pageNumberNearlyClosedProjects: number = 0;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getOpenProjects(0);
    this.getNearlyClosedProjects(0);
  }

  getOpenProjects(page: number): void {
    this.pagesOpenProjects = this.projectService.getOpenProjects(page);
  }

  getNearlyClosedProjects(page: number): void {
    this.pagesNearlyClosedProjects = this.projectService.getNearlyClosedProjects(page);
  }

  processSpreadPageOpenProjects(page: number) {
    this.pageNumberOpenProjects = page;
    this.getOpenProjects(this.pageNumberOpenProjects);
    console.log(page);
  }

  processSpreadPageNearlyClosedProjects(page: number) {
    this.pageNumberNearlyClosedProjects = page;
    this.getNearlyClosedProjects(this.pageNumberNearlyClosedProjects);
    console.log(page);
  }

}
