import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  constructor(private http: Http) { }

  getPacotesServico() {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get(`${environment.urlSpring}/servicos/pacotes`, { headers: hds, withCredentials: true })
  }

  getServicos() {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get(`${environment.urlSpring}/servicos`, { headers: hds, withCredentials: true })
  }
}
