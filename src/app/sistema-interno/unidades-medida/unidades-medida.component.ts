import { Component, OnInit } from '@angular/core';
import { UnidadeMedida } from '../../models/unidade-medida';

import * as Lodash from 'lodash';
import { UnidadeMedidaService } from '../../services/unidade-medida.service';

@Component({
  selector: 'app-unidades-medida',
  templateUrl: './unidades-medida.component.html',
  styleUrls: ['./unidades-medida.component.css']
})
export class UnidadesMedidaComponent implements OnInit {

  unidadesMedida: UnidadeMedida[] = [];
  loading:boolean;
  customLoadingTemplate:any;
  constructor(private unidadeMedidaService: UnidadeMedidaService) { }

  ngOnInit() {
    this.getUnidadesMedida();
  }

  getUnidadesMedida() {
    this.loading = true
    this.unidadeMedidaService.getUnidadesMedida().subscribe(data => {
      this.unidadesMedida = Lodash.orderBy(data.json(), 'idUnidade', 'desc')
      this.loading = false
    }, error => this.loading = false);
  }

  adicionarUnidadeMedidaForm() {
    this.unidadesMedida.unshift(new UnidadeMedida());
  }

  aoRemover(unidadeMedidaRemovida) {
    this.unidadesMedida = this.unidadesMedida.filter(unidadeMedida => unidadeMedida != unidadeMedidaRemovida);
  }

  aoSalvar(salvo) {
    if (salvo) {
      this.getUnidadesMedida();
    }
  }

}
