import { Component, OnInit, Input } from '@angular/core';
import {Project} from '../../models/project';
declare var $ : any;

@Component({
  selector: 'app-table-project',
  templateUrl: './table-project.component.html',
  styleUrls: ['./table-project.component.css']
})
export class TableProjectComponent implements OnInit {
  @Input() projects:Project[];

  constructor() { }

  ngOnInit(): void {
  }

  collapse():void{
    $('.navbar-collapse').collapse('hide');
  }
}
