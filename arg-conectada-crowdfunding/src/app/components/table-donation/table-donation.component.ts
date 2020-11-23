import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table-donation',
  templateUrl: './table-donation.component.html',
  styleUrls: ['./table-donation.component.css']
})
export class TableDonationComponent implements OnInit {
  @Input() pagesDonations: Observable<any>;
  @Output() spreadPage = new EventEmitter<number>();

  totalPages: Array<number>;
  page = 0;

  constructor() { }

  ngOnInit(): void {
    this.loadDonations();
   }

  getDate(dateDonation: string){
    const stringValue = dateDonation;
    let date = moment.utc(stringValue).local();
    return date.format('DD/MM/YYYY');
  }

  loadDonations() {
    this.pagesDonations.subscribe(
      data => {
        this.totalPages = new Array(data['totalPages']);
      }
    );
  }

  rewind(): void {
      this.page--;
      this.spreadPage.emit(this.page);
      console.log(this.page);
      this.loadDonations();
  }
  
  forward(): void {
      this.page++;
      this.spreadPage.emit(this.page);
      console.log(this.page);
      this.loadDonations();
  }
  
  setPage(page: number): void {
    this.page = page;
    this.spreadPage.emit(this.page);
    this.loadDonations();
  }

}
