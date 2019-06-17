import { Component, OnInit, Inject } from '@angular/core';
import { MercadoComponent } from '../../mercado.component';
import { ServicoService } from '../../../../services/servico.service';
import { MercadoLocalidade } from '../../../../models/mercado-localidade';
import { MercadoServico } from '../../../../models/mercado-servico';


@Component({
  selector: 'app-pacote-servicos',
  templateUrl: './pacote-servicos.component.html',
  styleUrls: ['./pacote-servicos.component.css']
})

export class PacoteServicosComponent implements OnInit {

  idServMercado: number;

  constructor(@Inject(MercadoComponent) private mercadoComponent: MercadoComponent,
    private servicoService: ServicoService) {
  }

  ngOnInit() {
    console.log(this.mercadoComponent.mercado.mercadoLocalidades[0].servicosTemp);
    this.mercadoComponent.mercado.mercadoLocalidades.map(localidade => {
      //console.log(localidade.servicosTemp)
      //console.log(localidade.mercadoServicos)
      let idPacote;
      let fativo;
      localidade.mercadoServicos.map(servico => {
        idPacote = servico.pacoteServico.idPacoteServico;
        fativo = servico.fativo;  
       });


     localidade.servicosTemp.map(servicotmp => {    
       //console.log(servicotmp)
       if(servicotmp.pacoteSelecionado.idPacoteServico === idPacote){
         servicotmp.pacoteSelecionado.fativo = fativo;
       }
     });

    });
  }

  mudarSelect(pacoteIdEscolhido, localidade: MercadoLocalidade, servicoAtivo: MercadoServico) {
    
    let pacotesServicos = servicoAtivo.pacoteServicos;
    let idPacoteAntigo = servicoAtivo.pacoteSelecionado.idPacoteServico;
    
    let novoServico=new MercadoServico();
    
    let pacoteAtivo: any = pacotesServicos.find(pacoteServico => pacoteServico.idPacoteServico === pacoteIdEscolhido);
        
    if (localidade.idMercadoLocalidade) {
      let achou=false;  
      localidade.mercadoServicos.map(servicotmp => {
        //console.log(servicotmp)
        if(servicotmp.pacoteServico.idPacoteServico === idPacoteAntigo){
          this.idServMercado = servicotmp.idMercadoServico;
          //console.log(idServMercado);
          if(servicotmp.idMercadoServico === this.idServMercado){          
            servicotmp.pacoteServico = pacoteAtivo;
            achou=true;
          }
        }
        });
      if(!achou){
          //console.log(novoServico);
          novoServico.pacoteServico=pacoteAtivo;
          novoServico.saldo=pacoteAtivo.valor;
          localidade.mercadoServicos.push(novoServico);
        }
        achou=false;
    } else {
      novoServico.pacoteServico=pacoteAtivo;
      novoServico.saldo=pacoteAtivo.valor;
      localidade.mercadoServicos.push(novoServico);
    }  
    //console.log(localidade);
    
  }

  proximaTab() {

    this.mercadoComponent.selectedTab = this.mercadoComponent.tabs.filter(tab => tab.key === 'finalizacao')[0];
    this.mercadoComponent.tabs.find(tab => tab.key === 'finalizacao').disabled = false;
  }

  anteriorTab() {
    this.mercadoComponent.selectedTab = this.mercadoComponent.tabs.filter(tab => tab.key === 'localidade-filial')[0];
  }

  toogleServico(valor, localidade: MercadoLocalidade, servicoAtivo: MercadoServico) {  
    //console.log(this.idServMercado);
    
    let idPacoteAntigo = servicoAtivo.pacoteSelecionado.idPacoteServico;
    if (localidade.idMercadoLocalidade) {      
      localidade.mercadoServicos.map(servicotmp => {
        //console.log(servicotmp);
        if(servicotmp.pacoteServico.idPacoteServico === idPacoteAntigo){
          this.idServMercado = servicotmp.idMercadoServico;
          //console.log(idServMercado);
          if(servicotmp.idMercadoServico === this.idServMercado){          
            servicotmp.fativo =valor.checked;
          } 
          }
        
        });
     
    //console.log(localidade);
  }
}



}
