import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Subcategoria } from '../models/subcategoria';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {

  constructor(private http: Http) { }

  getSubcategorias() {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get(`${environment.urlSpring}/subcategorias`, { headers: hds, withCredentials: true })
  }

  postSubcategoria(subcategoria: Subcategoria) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post(`${environment.urlSpring}/subcategorias`, subcategoria, { headers: hds, withCredentials: true })
  }

  putSubcategoria(subcategoria: Subcategoria) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.put(`${environment.urlSpring}/subcategorias/${subcategoria.idSubcategoria}`, subcategoria, { headers: hds, withCredentials: true })
  }

  deleteSubcategoria(idSubcategoria: number) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.delete(`${environment.urlSpring}/subcategorias/${idSubcategoria}`, { headers: hds, withCredentials: true })
  }

  getSubcategoriasByCategoria(idCategoria) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get(`${environment.urlSpring}/subcategorias/categoria/${idCategoria}`, { headers: hds, withCredentials: true })
  }
}
