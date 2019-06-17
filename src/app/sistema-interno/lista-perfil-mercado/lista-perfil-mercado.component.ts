import { Component, OnInit } from '@angular/core';
import { MercadoService } from '../../services/mercado.service';
import { Mercado } from '../../models/mercado';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoService } from '../../services/estado.service';
import { Estado } from '../../models/estado';
import { CidadeService } from '../../services/cidade.service';
import { Cidade } from '../../models/cidade';
import { Bairro } from '../../models/bairro';
import { BairroService } from '../../services/bairro.service';

@Component({
  selector: 'app-lista-perfil-mercado',
  templateUrl: './lista-perfil-mercado.component.html',
  styleUrls: ['./lista-perfil-mercado.component.css']
})
export class ListaPerfilMercadoComponent implements OnInit {

  observable: any;

  mercados: Mercado[] = [];
  ativarMercado: boolean;
  formLocalidade: FormGroup;
  listaEstados: Estado[] = [];
  listaCidades: Cidade[] = [];
  listaBairros: Bairro[] = [];

  constructor(
    private mercadoService: MercadoService,
    private formBuilder: FormBuilder,
    private estadoService: EstadoService,
    private cidadeService: CidadeService,
    private bairroService: BairroService
  ) {
    this.formLocalidade = this.formBuilder.group({
      estado: [{ value: '' }, [Validators.required]],
      cidade: [{ value: '' }, [Validators.required]],
      bairro: [{ value: '' }, [Validators.required]],
      ativar: [false]
    });
  }

  ngOnInit() {

    //this.getMercados();

    this.getEstados();

  }

  /*   getMercados(evento) {
      if(evento){
        this.observable = this.mercadoService.getMercados(true).subscribe(data => {
          this.mercados = data.json();
          console.log( this.mercados)
        }, error => console.log(error));
      }
      
    } */

  getEstados() {
    this.estadoService.getEstados().subscribe(data => {
      this.listaEstados = data.json();
    }, erro => {
      console.error(erro.json());
    });
  }

  atualizaCidadeSelect(estado: Estado) {
    this.getCidadesPorEstado(estado.idEstado);
  }

  getCidadesPorEstado(idEstado: number) {
    this.cidadeService.getCidadesPorEstado(idEstado).subscribe(data => {
      this.listaCidades = data.json();
    }, erro => {
      console.error(erro.json());
    });
  }

  atualizaBairroSelect(cidade: Cidade) {
    console.log(cidade.idCidade)
    this.getBairrosPorCidade(cidade.idCidade);

  }

  getBairrosPorCidade(idCidade: number) {
    this.bairroService.getBairrosPorCidade(idCidade).subscribe(data => {
      console.log(data.json())
      this.listaBairros = data.json();
    }, erro => {
      console.error(erro.json());
    });
  }

  pesquisarMercados() {
    let fAtivo = this.formLocalidade.get('ativar').value;
    let bairro = this.formLocalidade.get('bairro').value.idBairro

    if (bairro) {
      this.observable = this.mercadoService.getMercadosPorBairro(bairro, !fAtivo).subscribe(data => {
        this.mercados = data.json();
      }, error => console.log(error));
    } else {
      this.getMercados(!fAtivo);
    }
  }

  getMercados(evento) {
    if (evento) {
      this.pesquisarMercados()
    }
  }

}
