import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BairroService {

  constructor(
    private http: Http
  ) { }

  getBairrosPorCidade(idCidade: number) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
////////////////////////////////
    return this.http.get(`${environment.urlSpring}/bairros/cidade/${idCidade}&${false}`, { headers: hds, withCredentials: true });
  }
}
