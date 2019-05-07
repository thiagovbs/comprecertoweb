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
      bairro: [{ value: '' }, [Validators.required]]
    });
  }

  ngOnInit() {
    this.getMercados();
    this.getEstados();
  }

  getMercados() {
    this.observable = this.mercadoService.getMercados().subscribe(data => {
      this.mercados = data.json();
    }, error => console.log(error));
  }

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
    this.getBairrosPorCidade(cidade.idCidade);
  }

  getBairrosPorCidade(idCidade: number) {
    this.bairroService.getBairrosPorCidade(idCidade).subscribe(data => {
      this.listaBairros = data.json();
    }, erro => {
      console.error(erro.json());
    });
  }

  pesquisarMercados() {
    this.observable = this.mercadoService.getMercadosPorBairro(this.formLocalidade.get('bairro').value.idBairro).subscribe(data => {
      this.mercados = data.json();
    }, error => console.log(error));
  }
}
