import { Component, OnInit, Inject } from '@angular/core';
import { MercadoComponent } from '../../mercado.component';
import { MercadoLocalidade } from '../../../../models/mercado-localidade';
import { MercadoService } from '../../../../services/mercado.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-pre-visualizacao',
  templateUrl: './pre-visualizacao.component.html',
  styleUrls: ['./pre-visualizacao.component.css']
})
export class PreVisualizacaoComponent implements OnInit {

  constructor(@Inject(MercadoComponent) private mercadoComponent: MercadoComponent, private mercadoService: MercadoService) { }

  ngOnInit() {
  }

  getValorTotal() {
    return this.mercadoComponent.mercado.mercadoLocalidades.map(localidade => this.getValorRegional(localidade)).reduce((total, valor) => total += valor);
  }

  getValorRegional(localidade: MercadoLocalidade) {
    return localidade.mercadoServicos.map(servico => (servico.pacoteServico.valor - servico.pacoteServico.acrescimo) - servico.pacoteServico.desconto).reduce((total, valor) => total += valor);
  }
}
