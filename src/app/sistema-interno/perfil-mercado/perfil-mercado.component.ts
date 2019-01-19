import { Component, OnInit, Input } from '@angular/core';
import { Mercado } from '../../models/mercado';
import { MercadoLocalidade } from '../../models/mercado-localidade';

@Component({
  selector: 'app-perfil-mercado',
  templateUrl: './perfil-mercado.component.html',
  styleUrls: ['./perfil-mercado.component.css']
})
export class PerfilMercadoComponent implements OnInit {

  @Input('mercado')
  mercado: Mercado = new Mercado();

  constructor() { }

  ngOnInit() {
  }

  getValorRegional(localidade: MercadoLocalidade) {
    return localidade.mercadoServicos.map(servico => (servico.pacoteServico.valor - servico.pacoteServico.acrescimo) - servico.pacoteServico.desconto).reduce((total, valor) => total += valor);
  }

  getValorTotal() {
    return this.mercado.mercadoLocalidades.map(localidade => this.getValorRegional(localidade)).reduce((total, valor) => total += valor);
  }

}
