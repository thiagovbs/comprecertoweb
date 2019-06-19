import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  constructor(
    private http: Http,
    private usuarioService: UsuarioService
  ) { }

  getCidadesPorEstado(idEstado: number) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
///////////////////////////////////////
    return this.http.get(`${environment.urlSpring}/cidades/estado/${idEstado}&${false}`, { headers: hds, withCredentials: true });
  }

  getCidadePorEstadoMercado(idEstado: number) {    
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    let idMercado = this.usuarioService.getUsuarioLogged().mercado.idMercado; 
    return this.http.get(`${environment.urlSpring}/cidades/estadomercado/${idEstado}&${idMercado}`, { headers: hds, withCredentials: true });
  }
}
