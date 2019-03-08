import { Component, OnInit, Inject } from '@angular/core';
import { PerfilFerramentasComponent } from '../../perfil-ferramentas.component';
import { MercadoLocalidade } from '../../../../models/mercado-localidade';

@Component({
  selector: 'app-informacao-pacote',
  templateUrl: './informacao-pacote.component.html',
  styleUrls: ['./informacao-pacote.component.css']
})
export class InformacaoPacoteComponent implements OnInit {

  constructor(@Inject(PerfilFerramentasComponent) private perfilFerramentasComponent: PerfilFerramentasComponent) { }

  ngOnInit() {
  }

  getValorRegional(localidade: MercadoLocalidade) {
    return localidade.mercadoServicos.map(servico => (servico.pacoteServico.valor - servico.pacoteServico.acrescimo) - servico.pacoteServico.desconto).reduce((total, valor) => total += valor);
  }

}
