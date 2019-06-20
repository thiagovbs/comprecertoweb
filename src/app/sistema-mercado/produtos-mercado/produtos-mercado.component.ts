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
import { Subcategoria } from '../../models/subcategoria';
import swal from 'sweetalert2';

@Component({
  selector: 'app-produtos-mercado',
  templateUrl: './produtos-mercado.component.html',
  styleUrls: ['./produtos-mercado.component.css']
})
export class ProdutosMercadoComponent implements OnInit {


  mercadoprodutos: MercadoProduto[] = [];
  mercadoprodutosTotal: MercadoProduto[] = [];
  localidadeAtual: MercadoLocalidade;

  dtEntrada: any;
  minDate = new Date();
  //listas
  listaEstados: Estado[] = [];
  listaCidades: Cidade[] = [];
  listaBairros: Bairro[] = [];
  listaCategorias: Categoria[] = [];


  categoriaEscolhida: Categoria;
  idBairro: number;
  idMercado: number

  //booleano
  temProduto: boolean = false;

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
    //pegar id do mercado 
    this.idMercado = this.usuarioService.getUsuarioLogged().mercado.idMercado

    this.temProduto = false;

    this.getEstados();

  }

  private getEstados() {
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
    this.cidadeService.getCidadePorEstadoMercado(idEstado).subscribe(data => {
      this.listaCidades = data.json();
    }, erro => {
      console.error(erro.json());
    });
  }

  atualizaBairroSelect(cidade: Cidade) {
    this.getBairrosPorCidade(cidade.idCidade);

  }

  getBairrosPorCidade(idCidade: number) {
    this.bairroService.getBairrosPorCidadeMercado(idCidade).subscribe(data => {
      this.listaBairros = data.json();
      console.log(data.json())
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
    this.temProduto = false;
    this.mercadoprodutos = [];
    this.listaCategorias = [];

    this.dtEntrada = this.formLocalidade.get('dataEntrada').value.split('T')[0];
    this.idBairro = this.formLocalidade.get('bairro').value.idBairro;

    this.getCategorias();

    this.mercadoProdutoService.getBuscarMercadoProdutosPorBairroEDtEntrada(this.idBairro, this.dtEntrada)
      .subscribe(resp => {
        this.mercadoprodutosTotal = resp.json();
      })

    this.mercadoLocalidadeService.getMercadoLocalidadePorMercadoEBairro(this.idMercado, this.idBairro)
      .subscribe(data => {
        this.localidadeAtual = data.json()[0]
      },
        erro => console.error(erro.json()));
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
    if (this.categoriaEscolhida)
      this.mercadoprodutos.unshift(new MercadoProduto());
    else
      swal('Categoria', `Selecione uma categoria!`, "warning")

  }

  atualizaCategoriaSelect(categoria) {
    this.categoriaEscolhida = categoria
    this.getMercadoProdutosPorBairroEDtEntrata()
  }

  getCategorias() {
    this.categoriaService.getCategorias()
      .subscribe(data => {
        this.listaCategorias = data.json();
      }, error => console.log(error));
  }


  getMercadoProdutosPorBairroEDtEntrata() {

    //serviço que filtra a dtEntrada para buscar os produtos do mercado localidade 
    this.mercadoProdutoService.getBuscarMercadoProdutosPorBairroEDtEntrada(this.idBairro, this.dtEntrada)
      .subscribe(resp => {
        this.mercadoprodutos = resp.json();
        this.temProduto = true;

      }, erro => { },
        () => {
          if (this.mercadoprodutos.length !== 0) { }
          this.enviarProdutosCadastradosFiltrados(this.mercadoprodutos)
        })
  }

  private enviarProdutosCadastradosFiltrados(produtos: MercadoProduto[]) {
    let filtroProdutos: MercadoProduto[] = [];
    this.categoriaEscolhida.subcategorias.map((subcategoria: Subcategoria) => {
      let idSubcategoria = subcategoria.idSubcategoria
      let filtro = produtos.find((prod: MercadoProduto) => {
        return prod.produto.subcategoria.idSubcategoria === idSubcategoria
      })
      if (filtro) {
        filtroProdutos.push(filtro)
      }
    })
    this.mercadoprodutos = filtroProdutos;
    console.log(filtroProdutos)

  }

}
