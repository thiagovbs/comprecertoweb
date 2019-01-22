import { MercadoService } from '../../services/mercado.service';
import { Component, OnInit } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Mercado } from '../../models/mercado';

import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

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
      nome: 'Cadastro Mercado',
      disabled: false
    },
    {
      key: 'localidade-filial',
      nome: 'Localidade e Filiais',
      disabled: true
    },
    {
      key: 'servicos',
      nome: 'Pacotes de Serviços',
      disabled: true
    },
    {
      key: 'finalizacao',
      nome: 'Pré-visualização e Finalizar',
      disabled: true
    }
  ];
  selectedTab: any;
  messageOpen = false;
  sidePanelOpened = true;

  mercado: Mercado = new Mercado();

  constructor(private mercadoService: MercadoService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      if (params['idMercado'] !== undefined) {
        this.mercado.idMercado = params['idMercado'];
        this.getMercadoPorId();
        this.tabs.forEach(tab => tab.disabled = false);
      }
    });
    this.selectedTab = this.tabs[0];
  }

  isOver(): boolean {
    return this.mediaMatcher.matches;
  }

  salvar() {
    console.log(this.mercado);
    console.log(JSON.stringify(this.mercado));

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

  getMercadoPorId() {
    this.mercadoService.getMercadoPorId(this.mercado.idMercado).subscribe(data => {
      this.mercado = data.json();
      console.log(data.json())
    }, error => {
      console.log(error.json());
    }, () => {
      this.mercado.mercadoLocalidades.forEach(localidade => {
        let localidades = localidade.googlemapsLinks.split(',');
        localidade.googlemapsLinksTemp = localidades.map((loc, index) => ({ id: index, value: loc }));
      })
    })
  }
}
