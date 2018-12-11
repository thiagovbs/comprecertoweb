import { Estado } from './../../../../models/estado';
import { Cidade } from './../../../../models/cidade';
import { Component, OnInit, Inject } from '@angular/core';
import { MercadoComponent } from '../../mercado.component';
import { NgxViacepService, Endereco, ErroCep } from '@brunoc/ngx-viacep';
import { Bairro } from '../../../../models/bairro';
import { Pais } from '../../../../models/pais';

@Component({
  selector: 'app-localidade-filial',
  templateUrl: './localidade-filial.component.html',
  styleUrls: ['./localidade-filial.component.css']
})
export class LocalidadeFilialComponent implements OnInit {

  cep: string;
  enderecoTemp: Bairro;

  static cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  constructor(@Inject(MercadoComponent) private mercadoComponent: MercadoComponent, private viacep: NgxViacepService) { }

  ngOnInit() {
    this.mercadoComponent.mercado.mercadoLocalidades.forEach(localidade => {
      if (localidade.googlemapsLinks.length === 0) {
        ['', ''].map((value, index) => ({ value: value, id: index }));
      }
    })
  }

  buscarCep() {
    this.viacep.buscarPorCep(this.cep).then((endereco) => {
      this.enderecoTemp = this.parseEndereco(endereco);
    }).catch((error: ErroCep) => {
      console.log(error.message);
    });
  }

  removeLocalidade(localidade: any): void {
    const index = this.mercadoComponent.mercado.mercadoLocalidades.indexOf(localidade);

    if (index >= 0) {
      this.mercadoComponent.mercado.mercadoLocalidades.splice(index, 1);
    }
  }

  parseEndereco(endereco) {
    let bairro: Bairro = new Bairro();
    let cidade: Cidade = new Cidade();
    let estado: Estado = new Estado();
    let pais: Pais = new Pais();

    pais.nome = 'Pais';
    pais.sigla = 'BR';

    estado.pais = pais;
    estado.nome = 'Rio de Janeiro';
    estado.sigla = endereco.uf;

    cidade.estado = estado;
    cidade.nome = endereco.localidade;

    bairro.cidade = cidade;
    bairro.nome = endereco.bairro;

    return bairro;
  }

  addEndereco() {
    this.mercadoComponent.mercado.mercadoLocalidades.push({
      idMercadoLocalidade: undefined,
      googlemapsLinks: [{ id: 0, value: '' }, { id: 1, value: '' }],
      mercadoServicos: [],
      bairro: this.enderecoTemp
    });
    this.cep = undefined;
    this.enderecoTemp = undefined;
  }

  proximaTab() {
    console.log(this.mercadoComponent.mercado)
    this.mercadoComponent.selectedTab = this.mercadoComponent.tabs.filter(tab => tab.key === 'servicos')[0];
  }

  atualizaGoogleMapsLink(event, localidadeIndex, linkIndex) {
    this.mercadoComponent.mercado.mercadoLocalidades[localidadeIndex].googlemapsLinks[linkIndex] = event
  }
}
