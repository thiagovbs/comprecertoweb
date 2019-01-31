import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Produto } from '../models/produto';
import { ImageUtilService } from './image-util.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: Http, public imageUtilService: ImageUtilService) { }

  getProdutos() {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get(`${environment.urlSpring}/produtos`, { headers: hds, withCredentials: true })
  }

  postProduto(produto: Produto) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post(`${environment.urlSpring}/produtos`, produto, { headers: hds, withCredentials: true })
  }

  putProduto(produto: Produto) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.put(`${environment.urlSpring}/produtos/${produto.idProduto}`, produto, { headers: hds, withCredentials: true })
  }

  deleteProduto(idProduto: number) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.delete(`${environment.urlSpring}/produtos/${idProduto}`, { headers: hds, withCredentials: true })
  }

  getMarcasPorSubcategoria(idSubcategoria: number) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get(`${environment.urlSpring}/produtos/marcas/subcategoria/${idSubcategoria}`, { headers: hds, withCredentials: true })
  }

  postUploadFile(file) {

    let pictureBlog = this.imageUtilService.dataUriToBlob(file);
    let formData: FormData = new FormData();
    formData.set('file', pictureBlog, 'file.png');

    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(`${environment.urlSpring}/produtos/picture`, formData, { headers: hds, withCredentials: true });
  }
}
