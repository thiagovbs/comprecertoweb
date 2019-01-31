import { Categoria } from './../models/categoria';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ImageUtilService } from './image-util.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: Http, public imageUtilService: ImageUtilService) { }

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

  deleteCategoria(idCategoria: number) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.delete(`${environment.urlSpring}/categorias/${idCategoria}`, { headers: hds, withCredentials: true })
  }

  postUploadFile(file) {

    let pictureBlog = this.imageUtilService.dataUriToBlob(file);
    let formData: FormData = new FormData();
    formData.set('file', pictureBlog, 'file.png');

    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(`${environment.urlSpring}/categorias/picture`, formData, { headers: hds, withCredentials: true });
  }

/*   getImageFromBucket(id:number):Observable<any>{
    let url =`${environment.urlS3}/cat${id}.jpg`;
    return this.http.get(url, {responseType: });
  } */
}
