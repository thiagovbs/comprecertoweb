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

  constructor(private unidadeMedidaService: UnidadeMedidaService) { }

  ngOnInit() {
    this.getUnidadesMedida();
  }

  getUnidadesMedida() {
    this.unidadeMedidaService.getUnidadesMedida().subscribe(data => this.unidadesMedida = Lodash.orderBy(data.json(), 'idUnidade', 'desc'), error => console.log(error.json()));
  }

  adicionarUnidadeMedidaForm() {
    this.unidadesMedida.unshift(new UnidadeMedida());
  }

  aoRemover(unidadeMedidaRemovida) {
    console.log(unidadeMedidaRemovida)
    this.unidadesMedida = this.unidadesMedida.filter(unidadeMedida => unidadeMedida != unidadeMedidaRemovida);
  }

  aoSalvar(salvo) {
    if (salvo) {
      this.getUnidadesMedida();
    }
  }

}
