import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { MercadoProduto } from "../models/mercado-produto";
import { environment } from "../../environments/environment";



@Injectable({
    providedIn: 'root'
  })
  export class MercadoProdutoService {

    constructor(private http: Http) { }

    salvarProdutosNoMercado(mercadoProduto:MercadoProduto){
        const hds = new Headers({
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          });
          return this.http.post(`${environment.urlSpring}/mercado-produtos`,mercadoProduto, { headers: hds, withCredentials: true })
    }

    putProdutosMercado(mercadoProduto:MercadoProduto){
      const hds = new Headers({
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
        return this.http.put(`${environment.urlSpring}/mercado-produtos/${mercadoProduto.idMercadoProduto}`,mercadoProduto,{ headers: hds, withCredentials: true })
  }

    getBuscarMercadoProdutos(){
      const hds = new Headers({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      });
      return this.http.get(`${environment.urlSpring}/mercado-produtos`, { headers: hds, withCredentials: true })
    }

    deleteMercadoProduto(){
      
    }
      
  }