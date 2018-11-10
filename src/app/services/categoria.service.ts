import { Categoria } from './../models/categoria';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: Http) { }

  getCategorias() {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get(`${environment.urlSpring}/categorias`, { headers: hds, withCredentials: true })
  }

  postCategoria(categoria: Categoria) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post(`${environment.urlSpring}/categorias`, categoria, { headers: hds, withCredentials: true })
  }

  putCategoria(categoria: Categoria) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.put(`${environment.urlSpring}/categorias/${categoria.idCategoria}`, categoria, { headers: hds, withCredentials: true })
  }
}
