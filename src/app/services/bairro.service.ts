import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class BairroService {

  constructor(
    private http: Http,
    private usuarioService: UsuarioService
  ) { }

  getBairrosPorCidade(idCidade: number) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
////////////////////////////////
    return this.http.get(`${environment.urlSpring}/bairros/cidade/${idCidade}&${false}`, { headers: hds, withCredentials: true });
  }

  getBairrosPorCidadeMercado(idCidade: number) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    let idMercado = this.usuarioService.getUsuarioLogged().mercado.idMercado; 
    return this.http.get(`${environment.urlSpring}/bairros/cidadeMercad/${idCidade}&${idMercado}`, { headers: hds, withCredentials: true });
  }
}
