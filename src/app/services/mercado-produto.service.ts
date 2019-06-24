import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { MercadoProduto } from '../models/mercado-produto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MercadoProdutoService {

  constructor(private http: Http) { }

  salvarProdutosNoMercado(mercadoProduto: MercadoProduto) {
    console.log("salvar2")
    console.log(mercadoProduto)
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(`${environment.urlSpring}/mercado-produtos`, mercadoProduto, { headers: hds, withCredentials: true })
  }

  putProdutosMercado(mercadoProduto: MercadoProduto) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put(`${environment.urlSpring}/mercado-produtos/${mercadoProduto.idMercadoProduto}`, mercadoProduto, { headers: hds, withCredentials: true });
  }

  getBuscarMercadoProdutos(mercadoProduto) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${environment.urlSpring}/mercado-produtos?idMercadoLocalidade=${mercadoProduto}`, { headers: hds, withCredentials: true });
  }

  getBuscarMercadoProdutosPorData(idMercadoLocalidade: number, dtEntrada: any) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${environment.urlSpring}/mercado-produtos?idMercadoLocalidade=${idMercadoLocalidade}&dtEntrada=${dtEntrada}`, { headers: hds, withCredentials: true });
  }

  deleteMercadoProduto(id) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete(`${environment.urlSpring}/mercado-produtos/${id}`, { headers: hds, withCredentials: true });

  }

  getBuscarMercadoProdutosPorBairroEDtEntrada(idBairro: number, dtEntrada: any) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${environment.urlSpring}/mercado-produtos?idBairro=${idBairro}&dtEntrada=${dtEntrada}`, { headers: hds, withCredentials: true });
  }


  ///

  

}
