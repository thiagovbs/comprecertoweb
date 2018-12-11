import { Component, OnInit, Inject } from '@angular/core';
import { MercadoComponent } from '../../mercado.component';
import { ServicoService } from '../../../../services/servico.service';
import { Servico } from '../../../../models/servico';
import { MercadoLocalidade } from '../../../../models/mercado-localidade';
import { PacoteServico } from '../../../../models/pacote-servico';
import { MercadoServico } from '../../../../models/mercado-servico';

@Component({
  selector: 'app-pacote-servicos',
  templateUrl: './pacote-servicos.component.html',
  styleUrls: ['./pacote-servicos.component.css']
})
export class PacoteServicosComponent implements OnInit {

  servicos: any[] = [];
  // pacoteSelecionado: any;

  constructor(@Inject(MercadoComponent) private mercadoComponent: MercadoComponent, private servicoService: ServicoService) { }

  ngOnInit() {
    this.getServicos();
  }

  getServicos() {
    this.servicoService.getServicos().subscribe(data => {
      this.mercadoComponent.mercado.mercadoLocalidades.forEach(localidade => {
        localidade.servicosTemp = data.json();
      })
    }, error => {
      console.log(error);
    }, () => console.log(this.mercadoComponent.mercado.mercadoLocalidades))
  }

  adicionaRemoveServico(event, localidade: MercadoLocalidade, pacoteServico: PacoteServico) {
    let mercadoServico: MercadoServico = new MercadoServico();
    mercadoServico.pacoteServico = pacoteServico;

    if (event.checked) {
      localidade.mercadoServicos.push(mercadoServico);
    } else {
      let index = localidade.mercadoServicos.indexOf(mercadoServico);
      localidade.mercadoServicos.splice(index, 1);
    }
  }

  proximaTab() {
    console.log(this.mercadoComponent.mercado);
  }
}
