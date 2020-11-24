import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Place } from '../models/place';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private projectsUrl = `${environment.urlApi}/places`;  // URL to web api

  constructor(private http: HttpClient) { }

  getPlacesWithoutProject(): Observable<Place[]> {
    return this.http.get<Place[]>(`${this.projectsUrl}/getPlacesWithoutProject`)
  }
  
}
