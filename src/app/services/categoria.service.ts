import { Categoria } from './../models/categoria';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers } from '@angular/http';
import { ImageUtilService } from './image-util.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: Http, public imageUtilService: ImageUtilService) { }

  croppedFile: any = null;
  file: string;

  getCategorias() {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get(`${environment.urlSpring}/categorias`, { headers: hds, withCredentials: true });
  }

  postCategoria(categoria: Categoria) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post(`${environment.urlSpring}/categorias`, categoria, { headers: hds, withCredentials: true });
  }

  putCategoria(categoria: Categoria) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.put(`${environment.urlSpring}/categorias/${categoria.idCategoria}`, categoria, { headers: hds, withCredentials: true });
  }

  deleteCategoria(idCategoria: number) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.delete(`${environment.urlSpring}/categorias/${idCategoria}`, { headers: hds, withCredentials: true });
  }


  // inserir a imagem croppada que vem da pagina e jogar no método postUploadFile()
  getCroppedImageFile(myCroppedFile: File) {
    this.croppedFile = myCroppedFile;
  }

  // pegar o path da imagem que vem da pagina pré visualização e jogar no mercado model
  getImageUrl(myFile: string) {
    this.file = myFile;
  }

  postUploadFile() {
    if (this.croppedFile) {

      const pictureBlog = this.imageUtilService.dataUriToBlob(this.croppedFile);
      const formData: FormData = new FormData();
      formData.set('file', pictureBlog, 'file.png');

      const hds = new Headers({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      });
      return this.http.post(`${environment.urlSpring}/categorias/picture`, formData, { headers: hds, withCredentials: true });
    }
  }

  getCategoriaPorSubcategoria(idSubcategoria: number) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get(`${environment.urlSpring}/categorias/subcategoria/${idSubcategoria}`, { headers: hds, withCredentials: true });
  }
}
