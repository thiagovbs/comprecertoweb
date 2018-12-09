import { MercadoService } from '../../services/mercado.service';
import { Component, OnInit } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Mercado } from '../../models/mercado';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-mercado',
  templateUrl: './mercado.component.html',
  styleUrls: ['./mercado.component.css']
})
export class MercadoComponent implements OnInit {

  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: 960px)`);

  public config: PerfectScrollbarConfigInterface = {};

  displayMode = 'default';

  tabs: any = [
    {
      key: 'dados',
      nome: 'Cadastro Mercado'
    },
    {
      key: 'localidade-filial',
      nome: 'Localidade e Filiais'
    },
    {
      key: 'servicos',
      nome: 'Pacotes de Serviços'
    },
    {
      key: 'finalizacao',
      nome: 'Pré-visualização e Finalizar'
    }
  ];
  selectedTab: any;
  messageOpen = false;
  sidePanelOpened = true;

  mercado: Mercado = new Mercado();

  constructor(private mercadoService: MercadoService) { }

  ngOnInit() {
    this.selectedTab = this.tabs[0];
  }

  isOver(): boolean {
    return this.mediaMatcher.matches;
  }

  salvar() {
    this.mercado.mercadoLocalidades.forEach(localidade => localidade.googlemapsLinks = localidade.googlemapsLinks.map(googleMaps => googleMaps.value));

    if (this.mercado.idMercado) {
      this.mercadoService.putMercado(this.mercado).subscribe(data => {
        console.log(data.json())
        // this.atualizaProduto.emit(true);
      }, error => {
        console.log(error.json());
      }, () => {
        // this.formulario.disable();
        // this.hasEdit = false;
        Swal('Atualização', `O mercado ${this.mercado.nomeFantasia} foi atualizado!`, "success")
      })
    } else {
      this.mercadoService.postMercado(this.mercado).subscribe(data => {
        console.log(data.json())
        // this.atualizaProduto.emit(true);
      }, error => {
        console.log(error.json());
      }, () => {
        // this.formulario.disable();
        // this.hasEdit = false;
        Swal('Inclusão', `O mercado ${this.mercado.nomeFantasia} foi salvo!`, "success")
      })
    }
  }
}
