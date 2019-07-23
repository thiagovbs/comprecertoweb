import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { MercadoLocalidade } from '../models/mercado-localidade';


@Injectable({
  providedIn: 'root'
})
export class MercadoLocalidadeService {

  constructor(
    private http: Http,

  ) { }

  postMercadoLocalidade(mercadoLocalidade: MercadoLocalidade) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post(`${environment.urlSpring}/mercado-localidades`, mercadoLocalidade, { headers: hds, withCredentials: true });
  }

  getMercadoLocalidadePorMercadoEBairro(idMercado, idBairro) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    // tslint:disable-next-line: max-line-length
    return this.http.get(`${environment.urlSpring}/mercado-localidades?idMercado=${idMercado}&idBairro=${idBairro}`, { headers: hds, withCredentials: true });
  }

  getCidadePorMercadoLocalidade(idMercado, idEstado: number) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    // tslint:disable-next-line: max-line-length
    return this.http.get(`${environment.urlSpring}/mercado-localidades?idMercado=${idMercado}&${idEstado}`, { headers: hds, withCredentials: true });
  }

  getBairroPorMercadoLocalidade(idMercado, idCidade: number) {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    // tslint:disable-next-line: max-line-length
    return this.http.get(`${environment.urlSpring}/mercado-localidades?idMercado=${idMercado}&${idCidade}`, { headers: hds, withCredentials: true });
  }

  //Settar o usuário no localStorage
  setLocalAlcance(obj: any) {
    if (obj === null) {
      localStorage.removeItem('ALCANCE')
    } else {
      console.log(obj)
      localStorage.setItem('ALCANCE', JSON.stringify(obj))
    }
  }

  //Pegar o usuário ativo no localstorage
  getLocaAlcance() {
    let alcance = localStorage.getItem('ALCANCE');
    if (!alcance) {
      return null
    }
    let dataLocalStorage: any = JSON.parse(alcance).dataEntrada;
    dataLocalStorage = dataLocalStorage.split('T')[0]

    let anoStorage = dataLocalStorage.split('-')[0]
    let mesStorage = dataLocalStorage.split('-')[1]
    let diaStorage = dataLocalStorage.split('-')[2]

    let dataLocalStorageFormat = new Date(+mesStorage + "/" + diaStorage + "/" + anoStorage).getTime()
    let dataAtual: any = new Date().getTime()
    if (dataAtual >= dataLocalStorageFormat && alcance === null) {
      return null
    } else {
      return JSON.parse(alcance);
    }

  }
}
