import { Component, OnInit } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Mercado } from '../../models/mercado';

@Component({
  selector: 'app-supermercado',
  templateUrl: './supermercado.component.html',
  styleUrls: ['./supermercado.component.css']
})
export class SupermercadoComponent implements OnInit {

  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: 960px)`);

  public config: PerfectScrollbarConfigInterface = {};

  displayMode = 'default';

  tabs: any = [
    {
      key: 'dados',
      nome: 'Cadastro Supermercado'
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

  constructor() { }

  ngOnInit() {
    this.selectedTab = this.tabs[0];
  }

  isOver(): boolean {
    return this.mediaMatcher.matches;
  }

}
