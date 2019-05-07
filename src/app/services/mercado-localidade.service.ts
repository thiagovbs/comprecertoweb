import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MercadoLocalidadeService {

  constructor(
    private http: Http
  ) { }

  getMercadoLocalidadePorMercadoEBairro(idMercado, idBairro) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    // tslint:disable-next-line: max-line-length
    return this.http.get(`${environment.urlSpring}/mercado-localidades?idMercado=${idMercado}&idBairro=${idBairro}`, { headers: hds, withCredentials: true });
  }
}
