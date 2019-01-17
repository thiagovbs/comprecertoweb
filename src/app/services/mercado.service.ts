import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Mercado } from '../models/mercado';

@Injectable({
  providedIn: 'root'
})
export class MercadoService {

  constructor(private http: Http) { }

  postMercado(mercado: Mercado) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post(`${environment.urlSpring}/mercados`, mercado, { headers: hds, withCredentials: true })
  }

  putMercado(mercado: Mercado) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.put(`${environment.urlSpring}/mercados/${mercado.idMercado}`, mercado, { headers: hds, withCredentials: true })
  }

  getMercados() {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get(`${environment.urlSpring}/mercados`, { headers: hds, withCredentials: true })
  }
}
