import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { MercadoLocalidade } from '../models/mercado-localidade';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  constructor(private http: Http) { }


  localidadesEnvio:MercadoLocalidade[]=[]

  getPacotesServico() {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get(`${environment.urlSpring}/servicos/pacotes`, { headers: hds, withCredentials: true })
  }

  getServicos() {
    const hds = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get(`${environment.urlSpring}/servicos`, { headers: hds, withCredentials: true })
  }

  
  getAtualLocalidadePacoteServico(localidade: MercadoLocalidade, pacotesPorServicoBd:any[]) {
    let pacotes: any[] = []
    pacotesPorServicoBd.map(resp => {
      if (localidade.idMercadoLocalidade === resp.mercadoLocalidade.idMercadoLocalidade) {
        pacotes.push(resp.pacote)
        this.localidadesEnvio.push(resp.mercadoLocalidade)
        this.localidadesEnvio.map(localidade => {
          localidade.pacoteServicos = pacotes
        })
      }
    })
    
    //filtra o array para que não haja localidades repetidas
    this.localidadesEnvio = this.localidadesEnvio.filter((el, i, a) => i === a.indexOf(el))
    
  }
}
