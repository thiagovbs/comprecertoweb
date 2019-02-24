import { Component, OnInit, Inject } from '@angular/core';
import { MercadoComponent } from '../../mercado.component';
import { ServicoService } from '../../../../services/servico.service';
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
    if (!this.mercadoComponent.mercado.idMercado)
      this.getServicos();
  }

  getServicos() {
    this.servicoService.getServicos().subscribe(data => {
      this.mercadoComponent.mercado.mercadoLocalidades.forEach(localidade => {
        localidade.servicosTemp = data.json();
      })
    }, error => {
      console.log(error);
    })
  }

  adicionaRemoveServico(event, localidade: MercadoLocalidade, pacoteServico: PacoteServico) {
    let mercadoServico: MercadoServico = new MercadoServico();
    localidade.servicosTemp.forEach(servicos => {
      const pacote = servicos.pacoteServicos.find(pacote => pacote.idPacoteServico === pacoteServico.idPacoteServico);
      if (pacote)
        mercadoServico.pacoteServico = pacote;
    })

    if (event.checked) {
      localidade.mercadoServicos.push(mercadoServico);
    } else {
      let index = localidade.mercadoServicos.indexOf(mercadoServico);
      localidade.mercadoServicos.splice(index, 1);
    }
  }

  proximaTab() {
    this.mercadoComponent.selectedTab = this.mercadoComponent.tabs.filter(tab => tab.key === 'finalizacao')[0];
    this.mercadoComponent.tabs.find(tab => tab.key === 'finalizacao').disabled = false;
  }
}
