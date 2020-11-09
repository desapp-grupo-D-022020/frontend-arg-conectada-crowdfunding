import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ProjectService } from '../../services/project.service';
import { Project } from 'src/app/project';


@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getProject();
  }

  project: Project;

  amount = new FormControl('');
  comment = new FormControl('');

  getProject(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.projectService.getProject(id)
      .subscribe(project => this.project = project);
  }

  goBack(): void {
    this.location.back();
  }

  donate(): void {
    //TODO!
  }

}
