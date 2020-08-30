import { Observable, forkJoin } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FalconeSearchService {


  constructor(private http: HttpClient) { }

  getPlanets(): Observable<any> {
    return this.http.get('/planets');
  }

  getVehicles(): Observable<any> {
    return this.http.get('/vehicles');
  }

  fetchToken(): Observable<any> {
    var headers = new HttpHeaders()
    headers = headers.append('Accept', 'application/json');
   return this.http.post('/token', {}, {headers: headers});
  }

  findFalcone(data: any) : Observable<any> {

    var headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json');

    return this.http.post('/find', data, {headers: headers});
  }

}
