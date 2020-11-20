import { Component, OnInit, Input } from '@angular/core';
import { Donation } from 'src/app/models/donation';

@Component({
  selector: 'app-table-donation',
  templateUrl: './table-donation.component.html',
  styleUrls: ['./table-donation.component.css']
})
export class TableDonationComponent implements OnInit {
  @Input() donations:Donation[];

  constructor() { }

  ngOnInit(): void {
  }

}
