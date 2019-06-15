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

  pacotesPorServicoAtual: Array<PacoteServico> = [];
  localidadesServicoBd: Array<MercadoLocalidade> = [];
  //simular o component
  mercadoComponentLocalidadeBd: Array<any> = [];
  //objeto criado com a localidade e o pacote dos servicos
  pacotesPorServicoBd: Array<{
    pacote: PacoteServico,
    idPacoteAntigo: number,
    mercadoLocalidade: MercadoLocalidade
  }> = []

  localidadesEnvio: MercadoLocalidade[] = [];


  constructor(@Inject(MercadoComponent) private mercadoComponent: MercadoComponent,
    private servicoService: ServicoService) {

    this.mercadoComponentLocalidadeBd = this.mercadoComponent.mercado.mercadoLocalidades

  }

  ngOnInit() {

    console.log(this.mercadoComponent.mercado.mercadoLocalidades
      )
    //verificar as localidades da base e adiciona no objeto
    for (let localidade of this.mercadoComponent.mercado.mercadoLocalidades) {
      this.localidadesServicoBd.push(localidade)

      if (localidade.idMercadoLocalidade !== undefined) {
        for (let servico of localidade.mercadoServicos) {
          console.log(servico)
          this.pacotesPorServicoBd.push({
            pacote: servico.pacoteServico,
            idPacoteAntigo: servico.pacoteServico.idPacoteServico,
            mercadoLocalidade: localidade
          })
        }
      }
    }
  }

  mudarSelect(pacoteIdEscolhido, localidade: MercadoLocalidade, pacotesServicos: PacoteServico[]) {
    
    let verificaMudancaPacote: Boolean = false;
    let pacoteAtivo: any = pacotesServicos.find(pacoteServico => pacoteServico.idPacoteServico === pacoteIdEscolhido);


    //editar localidade existente
    if (localidade.idMercadoLocalidade) {
      //mapeia os pacotes existentes     
      pacotesServicos.map(servico => {
        this.pacotesPorServicoBd.map(servicoBd => {
          //se o pacote existir no banco, muda o valor dele, se não existir, adiciona outro
          if (servico.idPacoteServico === servicoBd.idPacoteAntigo) {
            servicoBd.pacote = pacoteAtivo
            verificaMudancaPacote = true
          }
        })
      })
    } else {
      //adicina um servico por mercado localidade
      localidade.mercadoServicos.push(pacoteAtivo)
    }
    if (!verificaMudancaPacote) {
      this.pacotesPorServicoBd.push({
        pacote: pacoteAtivo,
        idPacoteAntigo: pacoteAtivo.idPacoteServico,
        mercadoLocalidade: localidade
      })
    }

    verificaMudancaPacote = false;
    //transforma o objeto criado inicialmente para o que posso enviar para o mercado component
    this.servicoService.getAtualLocalidadePacoteServico(localidade, this.pacotesPorServicoBd)

    console.log(this.mercadoComponentLocalidadeBd)

  }

  proximaTab() {

    this.mercadoComponent.selectedTab = this.mercadoComponent.tabs.filter(tab => tab.key === 'finalizacao')[0];
    this.mercadoComponent.tabs.find(tab => tab.key === 'finalizacao').disabled = false;
  }

  anteriorTab() {
    this.mercadoComponent.selectedTab = this.mercadoComponent.tabs.filter(tab => tab.key === 'localidade-filial')[0];
  }



}
