import { Estado } from './../../../../models/estado';
import { Cidade } from './../../../../models/cidade';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MercadoComponent } from '../../mercado.component';
import { NgxViacepService, Endereco, ErroCep } from '@brunoc/ngx-viacep';
import { Bairro } from '../../../../models/bairro';
import { Pais } from '../../../../models/pais';
import { MercadoLocalidade } from '../../../../models/mercado-localidade';
import { ServicoService } from '../../../../services/servico.service';
import { MatTabGroup } from '@angular/material';

@Component({
  selector: 'app-localidade-filial',
  templateUrl: './localidade-filial.component.html',
  styleUrls: ['./localidade-filial.component.css']
})
export class LocalidadeFilialComponent implements OnInit {

  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;

  cep: string;
  enderecoTemp: Bairro;
  ruaTemp: string;
  cepNotFound: string;
  localidadeServicoTemp: any
  static cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  constructor(@Inject(MercadoComponent)
  public mercadoComponent: MercadoComponent,
    private viacep: NgxViacepService,
    private servicoService: ServicoService) { }

  ngOnInit() {
    this.getServicos()
  
    this.mercadoComponent.mercado.mercadoLocalidades.forEach(element => {
      let endereçoSplitted = element.endereco.split(/(?:(?:\ n\º))|(?:(?:\/))/);
      
      element.rua = endereçoSplitted[0];
      element.numero = endereçoSplitted[1];
      
      if (endereçoSplitted[2] === "undefined") { 
        element.complemento = " ";  
      }else{
        element.complemento = endereçoSplitted[2];
      }

    });
  }

  buscarCep() {
    this.viacep.buscarPorCep(this.cep).then((endereco) => {
      this.enderecoTemp = this.parseEndereco(endereco);
      this.ruaTemp = endereco.logradouro;
    }).catch((error: ErroCep) => {
      console.log(error.message);
      this.cepNotFound = error.message;
      setTimeout(() => this.cepNotFound = undefined, 3000);
    });
  }

  removeLocalidade(localidade: any): void {
    console.log(localidade)
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
    estado.nome = this.getNomeEstado(endereco.uf);
    estado.sigla = endereco.uf;

    cidade.estado = estado;
    cidade.nome = endereco.localidade;

    bairro.cidade = cidade;
    bairro.nome = endereco.bairro;


    return bairro;
  }

  getNomeEstado(uf) {
    switch (uf) {
      case 'AC':
        return 'Acre'
      case 'AL':
        return 'Alagoas'
      case 'AP':
        return 'Amapá'
      case 'AM':
        return 'Amazonas'
      case 'BA':
        return 'Bahia'
      case 'CE':
        return 'Ceará'
      case 'DF':
        return 'Distrito Federal'
      case 'GO':
        return 'Goiás'
      case 'MA':
        return 'Maranhão'
      case 'MT':
        return 'Mato Grosso'
      case 'MS':
        return 'Mato Grosso do Sul'
      case 'MG':
        return 'Minas Gerais'
      case 'PA':
        return 'Pará'
      case 'PB':
        return 'Paraíba'
      case 'PR':
        return 'Paraná'
      case 'PE':
        return 'Pernambuco'
      case 'PI':
        return 'Piauí'
      case 'RJ':
        return 'Rio de Janeiro'
      case 'RN':
        return 'Rio Grande do Norte'
      case 'RS':
        return 'Rio Grande do Sul'
      case 'RO':
        return 'Maranhão'
      case 'RR':
        return 'Roraima'
      case 'SC':
        return 'Santa Catarina'
      case 'SP':
        return 'São Paulo'
      case 'SE':
        return 'Sergipe'
      case 'TO':
        return 'Tocantins'
    }
  }

  getServicos() {
    this.servicoService.getServicos().subscribe(data => {
      this.localidadeServicoTemp = data.json();
    }, error => {
      console.log(error);
    })
  }

  verficaForm() {
    let tmp = false;
    if (this.mercadoComponent.mercado.mercadoLocalidades.length != 0) {
      tmp = true;
    }
    this.mercadoComponent.mercado.mercadoLocalidades.forEach(localidade => {
      if (!localidade.googlemapsLinks || localidade.googlemapsLinks === "" ||
        !localidade.rua || localidade.rua === "" || !localidade.numero || localidade.numero === "") {
        tmp = false;
      }
    });

    return tmp;


  }


  addEndereco() {

    this.mercadoComponent.mercado.mercadoLocalidades.push({
      idMercado: undefined,
      idMercadoLocalidade: undefined,
      googlemapsLinks: '',
      googlemapsLinksTemp: [{ id: 0, value: '' }],
      mercadoServicos: [],
      bairro: this.enderecoTemp,
      rua: this.ruaTemp,
      //endereco: this.enderecoRuaTemp +" nº"+this.enderecoNumeroTemp +"/"+ this.enderecoComplementoTemp,
      servicosTemp: this.localidadeServicoTemp
    });
    this.cep = undefined;
    this.enderecoTemp = undefined;
    this.ruaTemp = undefined;
    this.tabGroup.selectedIndex = this.mercadoComponent.mercado.mercadoLocalidades.length;
  }

  proximaTab() {


    this.mercadoComponent.mercado.mercadoLocalidades.forEach(localidade => {
      console.log(localidade)
      if (localidade.complemento) {
        localidade.endereco = localidade.rua + " nº" + localidade.numero + "/" + localidade.complemento;
      } else {
        localidade.endereco = localidade.rua + " nº" + localidade.numero ;
      }
    });
    this.mercadoComponent.selectedTab = this.mercadoComponent.tabs.filter(tab => tab.key === 'servicos')[0];
    this.mercadoComponent.tabs.find(tab => tab.key === 'servicos').disabled = false;
  }

  removeGoogleMapsLink(localidade: MercadoLocalidade, link: any) {
    const indexLink: number = localidade.googlemapsLinksTemp.indexOf(link, 0);
    localidade.googlemapsLinksTemp.splice(indexLink, 1);
  }

  addGoogleMapsLink(localidade: MercadoLocalidade) {
    localidade.googlemapsLinksTemp.push({ id: localidade.googlemapsLinksTemp.length - 1, value: '' });
  }

  anteriorTab() {
    this.mercadoComponent.selectedTab = this.mercadoComponent.tabs.filter(tab => tab.key === 'dados')[0];
  }
}
