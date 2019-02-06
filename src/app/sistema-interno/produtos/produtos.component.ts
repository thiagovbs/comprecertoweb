import { Component, OnInit } from '@angular/core';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto.service';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria';

import * as Lodash from "lodash";
import { SubcategoriaService } from '../../services/subcategoria.service';
import { Subcategoria } from '../../models/subcategoria';
import { UnidadeMedidaService } from '../../services/unidade-medida.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  produtos: Produto[] = [];

  filterShow: boolean = false;
  filter: ProdutoFilter = new ProdutoFilter();
  categorias: Categoria[] = [];
  subcategorias: Subcategoria[] = [];
  marcas: any[] = [];
  unidadesMedida: any[] = [];

  constructor(private produtoService: ProdutoService, private categoriaService: CategoriaService,
    private subcategoriaService: SubcategoriaService, private unidadeMedidaService: UnidadeMedidaService) { }

  ngOnInit() {
    this.getProdutos();
    this.getcategorias();
  }

  getProdutos() {
    this.produtoService.getProdutos().subscribe(data => {
      this.produtos = Lodash.orderBy(data.json(), 'idProduto', 'desc');
    }, error => console.log(error.json()));
  }

  adicionarProdutoForm() {
    this.produtos.unshift(new Produto());
  }

  aoRemover(produtoRemovida) {
    this.produtos = this.produtos.filter(produto => produto != produtoRemovida);
  }

  atualizaProduto(salvo) {
    if (salvo) {
      console.log(salvo)
      this.getProdutos();
    }
  }

  getcategorias() {
    this.categoriaService.getCategorias().subscribe(data => {
      this.categorias = Lodash.orderBy(data.json(), 'nome', 'asc');
    }, error => console.log(error))
  }

  carregaSubcategorias(categoria: Categoria) {
    this.subcategoriaService.getSubcategoriasByCategoria(categoria.idCategoria).subscribe(data => {
      this.subcategorias = Lodash.orderBy(data.json(), 'nome', 'asc');
    }, error => console.log(error))
  }

  carregaMarcas(subcategoria: Subcategoria) {
    this.produtoService.getMarcasPorSubcategoria(subcategoria.idSubcategoria).subscribe(data => {
      this.marcas = Lodash.orderBy(data.json(), 'nome', 'asc');
    }, error => console.log(error))
  }

  carregaUnidadesMedida(subcategoria: Subcategoria, marca: string) {
    this.produtoService.getUnidadesMedidaPorSubcategoriaEMarca(subcategoria.idSubcategoria, marca).subscribe(data => {
      this.unidadesMedida = Lodash.orderBy(data.json(), 'nome', 'asc');
    }, error => console.log(error))
  }

  filtrar() {
    this.produtoService.postFiltrar(this.filter).subscribe(data => this.produtos = data.json(), error => console.log(error));
  }
}

export class ProdutoFilter {

  categoria: Categoria;
  subcategoria: Subcategoria;
  marca: string;
  unidadeMedida: any;
}