import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { UnidadeMedida } from '../models/unidade-medida';
import { Subcategoria } from '../models/subcategoria';

@Injectable({
  providedIn: 'root'
})
export class UnidadeMedidaService {

  constructor(private http: Http) { }

  getUnidadesMedida() {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get(`${environment.urlSpring}/unidadesMedida`, { headers: hds, withCredentials: true })
  }

  postUnidadeMedida(unidadeMedida: UnidadeMedida) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post(`${environment.urlSpring}/unidadesMedida`, unidadeMedida, { headers: hds, withCredentials: true })
  }

  putUnidadeMedida(unidadeMedida: UnidadeMedida) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.put(`${environment.urlSpring}/unidadesMedida/${unidadeMedida.idUnidade}`, unidadeMedida, { headers: hds, withCredentials: true })
  }

  deleteUnidadeMedida(idUnidade: number) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.delete(`${environment.urlSpring}/unidadesMedida/${idUnidade}`, { headers: hds, withCredentials: true })
  }

  getUnidadesMedidaPorSubcategoria(subcategoria: Subcategoria) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get(`${environment.urlSpring}/unidadesMedida/buscarPorSubcategoria/${subcategoria.idSubcategoria}`, { headers: hds, withCredentials: true })
  }
}
