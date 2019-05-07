import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  constructor(
    private http: Http
  ) { }

  getCidadesPorEstado(idEstado: number) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get(`${environment.urlSpring}/cidades/estado/${idEstado}`, { headers: hds, withCredentials: true });
  }
}
