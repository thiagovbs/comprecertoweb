import { Component, OnInit } from '@angular/core';
import { MercadoProduto } from '../../models/mercado-produto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MercadoLocalidade } from '../../models/mercado-localidade';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material';
import { MercadoProdutoService } from '../../services/mercado-produto.service';
import { Estado } from '../../models/estado';
import { EstadoService } from '../../services/estado.service';
import { Cidade } from '../../models/cidade';
import { Bairro } from '../../models/bairro';
import { CidadeService } from '../../services/cidade.service';
import { BairroService } from '../../services/bairro.service';
import { MercadoLocalidadeService } from '../../services/mercado-localidade.service';
import { UsuarioService } from '../../services/usuario.service';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria';

@Component({
  selector: 'app-produtos-mercado',
  templateUrl: './produtos-mercado.component.html',
  styleUrls: ['./produtos-mercado.component.css']
})
export class ProdutosMercadoComponent implements OnInit {

  mercadoprodutos: MercadoProduto[];
  localidade: MercadoLocalidade;
  dtEntrada: any;
  minDate = new Date();
  listaEstados: Estado[] = [];
  listaCidades: Cidade[] = [];
  listaBairros: Bairro[] = [];
  listaCategorias: Categoria[] = [];
  categoriaEscolhida: Categoria;
  

  formLocalidade: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adapter: DateAdapter<any>,
    private mercadoProdutoService: MercadoProdutoService,
    private estadoService: EstadoService,
    private cidadeService: CidadeService,
    private bairroService: BairroService,
    private mercadoLocalidadeService: MercadoLocalidadeService,
    private usuarioService: UsuarioService,
    private categoriaService: CategoriaService
  ) {

    this.formLocalidade = this.formBuilder.group({
      estado: [{ value: '' }, [Validators.required]],
      cidade: [{ value: '' }, [Validators.required]],
      bairro: [{ value: '' }, [Validators.required]],
      dataEntrada: [{ value: '' }, [Validators.required]]
    });
  }


  ngOnInit() {
    this.getEstados();
  }

  getEstados() {
    this.estadoService.getEstadosPorMercado().subscribe(data => {
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

  getDataEntrada(event: MatDatepickerInputEvent<Date>) {
    this.adapter.setLocale('Pt');
    this.formLocalidade.get('dataEntrada').setValue(new Date(event.value).toISOString());
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Só deixa selecionar terças e quintas
    return day === 2 || day === 5;
  }

  pesquisarMercadoProdutos() {
    this.dtEntrada = this.formLocalidade.get('dataEntrada').value.split('T')[0];
    const splitData = this.formLocalidade.get('dataEntrada').value.split('T');

    //serviço que filtra a dtEntrada para buscar os produtos do mercado produto 
    this.mercadoProdutoService.getBuscarMercadoProdutosPorBairroEDtEntrada(this.formLocalidade.get('bairro').value.idBairro, splitData[0])
      .subscribe(resp => {
        this.mercadoprodutos = resp.json();
      }, erro => {
        console.error(erro.json());
      }, () => {
        if (this.mercadoprodutos.length === 0) {
          this.mercadoprodutos = [];
        }
        this.getCategorias();
      });

    this.mercadoLocalidadeService.getMercadoLocalidadePorMercadoEBairro(this.usuarioService.getUsuarioLogged().mercado.idMercado, this.formLocalidade.get('bairro').value.idBairro)
      .subscribe(data => this.localidade = data.json()[0], erro => console.error(erro.json()));
  }

  atualizaProduto(salvo) {
    if (salvo) {
      this.pesquisarMercadoProdutos();
    }
  }

  aoRemover(produtoRemovida) {
    this.mercadoprodutos = this.mercadoprodutos.filter(produto => produto !== produtoRemovida);
  }

  adicionarProdutoForm() {
    if (this.categoriaEscolhida) {
      this.mercadoprodutos.unshift(new MercadoProduto());
    }
  }

  atualizaCategoriaSelect(categoria) {
    this.categoriaEscolhida = categoria
  }

  getCategorias() {
    this.categoriaService.getCategorias()
      .subscribe(data => {
        this.listaCategorias = data.json();
      }, error => console.log(error));
  }

  enviarProdutosCadastradosFiltrados() {
    let filterProdutos: MercadoProduto[]= [];
    if (this.categoriaEscolhida) {
      this.categoriaEscolhida.subcategorias.map(subcategoria => {
       let filtro = this.mercadoprodutos.find((prod: MercadoProduto) => 
          prod.produto.subcategoria.idSubcategoria === subcategoria.idSubcategoria
        )
        if(filtro){
          filterProdutos.push(filtro);
        }
        
      });
      
      return filterProdutos
    }
  }
}
