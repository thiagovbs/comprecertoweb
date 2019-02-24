import { Component, OnInit } from '@angular/core';
import { Mercado } from '../../models/mercado';
import { MercadoService } from '../../services/mercado.service';

@Component({
  selector: 'app-perfil-ferramentas',
  templateUrl: './perfil-ferramentas.component.html',
  styleUrls: ['./perfil-ferramentas.component.css']
})
export class PerfilFerramentasComponent implements OnInit {

  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: 960px)`);

  displayMode = 'default';

  tabs: any = [
    {
      key: 'informacao-pacote',
      nome: 'Informações do pacote',
      disabled: false
    },
    {
      key: 'push-plus',
      nome: 'Push Plus',
      disabled: true
    },
    {
      key: 'push-direct',
      nome: 'Push Direct',
      disabled: true
    },
    {
      key: 'historico-push',
      nome: 'Histórico de Push',
      disabled: true
    }
  ];
  selectedTab: any;
  messageOpen = false;
  sidePanelOpened = true;

  mercado: Mercado = new Mercado();

  constructor(private mercadoService: MercadoService) { }

  ngOnInit() {
    this.selectedTab = this.tabs[0];
    this.mercadoService.getMercadoPorFuncionario().subscribe(data => this.mercado = data.json(), error => console.log(error))
  }

  isOver(): boolean {
    return this.mediaMatcher.matches;
  }

  getMercadoPerfil
}
