import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { ImageUtilService } from './image-util.service';
import { AuthenticationService } from './authentication.service';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: Http, public imageUtilService: ImageUtilService) { }

  croppedFile: File = null;
  file: string;


  getPedidos(idMercadoLocalidade) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
        /////////////////////////////////////////////////////////////
    return this.http.get(`${environment.urlSpring}/pedido/mercadoLocalidade/${idMercadoLocalidade}`, { headers: hds, withCredentials: true });
  }

  putPedido(pedido: Pedido) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.put(`${environment.urlSpring}/pedido/${pedido.idPedido}`, pedido, { headers: hds, withCredentials: true });
  }
}
