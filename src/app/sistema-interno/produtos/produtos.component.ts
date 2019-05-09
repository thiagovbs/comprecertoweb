import { Component, OnInit } from '@angular/core';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto.service';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria';

import * as Lodash from 'lodash';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  produtos: Produto[] = [];

  categorias: Categoria[] = [];
  categoria: Categoria;

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    this.getProdutos();
    this.getCategorias();
  }

  getProdutos() {
    this.produtoService.getProdutos().subscribe(data => {
      this.produtos = Lodash.orderBy(data.json(), 'idProduto', 'desc');
    }, error => console.error(error.json()));
  }

  adicionarProdutoForm() {
    this.produtos.unshift(new Produto());
  }

  aoRemover(produtoRemovida) {
    this.produtos = this.produtos.filter(produto => produto !== produtoRemovida);
  }

  atualizaProduto(salvo) {
    if (salvo) {
      this.getProdutos();
    }
  }

  getCategorias() {
    this.categoriaService.getCategorias().subscribe(data => {
      this.categorias = Lodash.orderBy(data.json(), 'nome', 'asc');
    }, error => console.error(error));
  }

  filtrar() {
    if (this.categoria) {
      this.produtoService.getProdutosPorCategoria(this.categoria.idCategoria).subscribe(data => this.produtos = data.json(), error => console.error(error));
    } else {
      this.getProdutos();
    }
  }
}
