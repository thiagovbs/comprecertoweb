import { Component, OnInit } from '@angular/core';
import { Produto } from '../../models/produto';
import { CategoriaService } from '../../services/categoria.service';
import * as Lodash from "lodash";
import { Categoria } from '../../models/categoria';
import { SubcategoriaService } from '../../services/subcategoria.service';
import { Subcategoria } from '../../models/subcategoria';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produtos-mercado',
  templateUrl: './produtos-mercado.component.html',
  styleUrls: ['./produtos-mercado.component.css']
})
export class ProdutosMercadoComponent implements OnInit {

  constructor(private categoriaService:CategoriaService,
              private subcategoriaService:SubcategoriaService,
              private produtoService: ProdutoService) { }


  produtos: Produto[] = [];
  categorias: Categoria[] = [];
  subcategorias: Subcategoria[] = [];
  marcas: any[] = [];
  unidadesMedida: any[] = [];


  ngOnInit() {
  }

  adicionarProdutoForm() {
    this.produtos.unshift(new Produto());
  }
  atualizaProduto(salvo) {
    if (salvo) {
      console.log(salvo)
      //this.getProdutos();
    }
  }
  aoRemover(produtoRemovida) {
    this.produtos = this.produtos.filter(produto => produto != produtoRemovida);
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
}
