import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Mercado } from '../models/mercado';
import { ImageUtilService } from './image-util.service';

@Injectable({
  providedIn: 'root'
})
export class MercadoService {

  constructor(
    private http: Http,
    public imageUtilService: ImageUtilService
  ) { }

  croppedFile: File = null;
  file: string;

  postMercado(mercado: Mercado) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(`${environment.urlSpring}/mercados`, mercado, { headers: hds, withCredentials: true });
  }

  putMercado(mercado: Mercado) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.put(`${environment.urlSpring}/mercados/${mercado.idMercado}`, mercado, { headers: hds, withCredentials: true });
  }

  getMercados() {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get(`${environment.urlSpring}/mercados`, { headers: hds, withCredentials: true });
  }

  getMercadoPorId(idMercado: number) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get(`${environment.urlSpring}/mercados/${idMercado}`, { headers: hds, withCredentials: true });
  }

  deleteMercado(idMercado: number) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.delete(`${environment.urlSpring}/mercados/${idMercado}`, { headers: hds, withCredentials: true });
  }

  getMercadoPorFuncionario() {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${environment.urlSpring}/mercados/funcionario`, { headers: hds, withCredentials: true });
  }

  // localidades do mercado
  getMercadoLocalidade() {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${environment.urlSpring}/mercado-localidades`, { headers: hds, withCredentials: true });
  }

  ativarMercado(id:number){
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });  
    return this.http.put(`${environment.urlSpring}/mercados/ativar/${id}`, { headers: hds, withCredentials: true });
  }

  // inserir a imagem croppada que vem da pagina pré visualização e jogar no método postUploadFile()
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
      return this.http.post(`${environment.urlSpring}/mercados/upload-foto-mercado`, { headers: hds, withCredentials: true });
    } else {
      console.log('não foi achado nem arquivo de imagem');
    }
  }

  getMercadosPorBairro(idBairro: number) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get(`${environment.urlSpring}/mercados?idBairro=${idBairro}`, { headers: hds, withCredentials: true });
  }
}
