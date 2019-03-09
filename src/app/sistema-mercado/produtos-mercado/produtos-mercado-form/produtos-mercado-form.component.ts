import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Produto } from '../../../models/produto';
import { Subcategoria } from '../../../models/subcategoria';
import { UnidadeMedida } from '../../../models/unidade-medida';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from '../../../services/produto.service';
import { SubcategoriaService } from '../../../services/subcategoria.service';
import { UnidadeMedidaService } from '../../../services/unidade-medida.service';
import * as Lodash from 'lodash';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-produtos-mercado-form',
  templateUrl: './produtos-mercado-form.component.html',
  styleUrls: ['./produtos-mercado-form.component.css']
})
export class ProdutosMercadoFormComponent implements OnInit {

  @Input() produto: Produto

  idSubcategoria: number
  subcategorias: Subcategoria[] = [];

  unidadesMedidas: UnidadeMedida[];

  categoriaId: number;
  categorias: Categoria[] = [];

  produtos: Produto[]
  filterProdutos: Produto[] = []

  marcas: Array<any> = [];

  formulario: FormGroup;

  @Output("removerProduto")
  produtoRemovida = new EventEmitter();

  @Output("atualizaProduto")
  atualizaProduto = new EventEmitter();

  hasEdit: boolean = true;

  constructor(private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private subcategoriaService: SubcategoriaService,
    private unidadeMedidaService: UnidadeMedidaService,
    private categoriaService: CategoriaService) {

    this.formulario = this.formBuilder.group({
      caracteristica: ['', [Validators.required]],


      valor: ['', [Validators.required]],
      marca: [{ value: '', disable: true }, [Validators.required]],
      categoria: [{ value: '' }, [Validators.required]],
      produto: [{ value: '', disable: true }, [Validators.required]],
      subcategoria: [{ value: '', disable: true }, [Validators.required]],
      unidadeMedida: [{ value: '', disable: true }, [Validators.required]]
    });
  }

  ngOnInit() {

    this.getCategorias();

    if (this.produto.idProduto) {
      this.formulario.disable();
      this.hasEdit = false;
    }
  }

  getCategorias() {
    this.categoriaService.getCategorias().subscribe((data: any) => {
      this.categorias = Lodash.orderBy(data.json(), 'nome', 'asc');
    }, error => console.log(error))
  }

  //atualiza o select da CATEGORIA para habilitar as SUBCATEGORIAS
  atualizaCategoriaSelect(categoria: Categoria) {

    this.filterProdutos = [];
    this.formulario.get('subcategoria').enabled;

    this.subcategorias = categoria.subcategorias;
    this.categoriaId = categoria.idCategoria
  }

  //atualiza o select da SUBCATEGORIA para habilitar os PRODUTOS
  atualizaSubcategoriaSelect(subcategoria: Subcategoria) {

    this.formulario.get('produto').enabled;

    this.idSubcategoria = subcategoria.idSubcategoria

    //pega as marca pelas subcategorias
    this.getMarcasPorSubcategoria(subcategoria.idSubcategoria);
    //pega os produtos pelas subcategorias
    this.getProdutosPorSubcategorias(subcategoria);
  }

  private getProdutosPorSubcategorias(subcategoria: Subcategoria) {

    this.subcategoriaService.getProdutosPorSubCategorias(this.categoriaId).subscribe(data => {
      this.produtos = data.json();
      this.filterProdutos = this.produtos.filter((prod: Produto) => prod.subcategoria.nome === subcategoria.nome);
    }, erro => { console.log(erro) })
  }

  private getMarcasPorSubcategoria(idSubcategoria) {
    this.produtoService.getMarcasPorSubcategoria(idSubcategoria).subscribe(data => {
      this.marcas = data.json();
    }, erro => { console.log(erro) })
  }

  atualizaMarcaSelect(marca) {

    this.produtoService.getUnidadesMedidaPorSubcategoriaEMarca(this.idSubcategoria, marca).subscribe(data => {
      this.unidadesMedidas = data.json()
      console.log(this.unidadesMedidas)
    }, erro => { console.log(erro) })
  }

  atualizaUnidadeMedidaSelect(value) {
    console.log(value)
    this.produto.unidadeMedida = this.unidadesMedidas.filter(unidadeMedida => unidadeMedida.idUnidade = value)[0];
  }

}
