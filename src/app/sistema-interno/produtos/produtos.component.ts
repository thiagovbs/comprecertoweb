import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto.service';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria';

import * as Lodash from 'lodash';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
  public loading = false;
  filterShow:boolean;
  produtos: Produto[] = [];

  categorias: Categoria[] = [];
  categoria: Categoria;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource= new MatTableDataSource();

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private changeDetectorRef: ChangeDetectorRef
  ) {

    this.getProdutos();
   }

  ngOnInit() {
    
    this.getCategorias(); 
  }

  getProdutos() {
    this.produtoService.getProdutos().subscribe(data => {
      //console.log(Lodash.orderBy(data.json(), 'idProduto', 'desc'))
      this.produtos = Lodash.orderBy(data.json(), 'idProduto', 'desc');
      this.changeDetectorRef.detectChanges();
      this.dataSource = new MatTableDataSource(Lodash.orderBy(data.json(), 'idProduto', 'desc'));
      this.obs = this.dataSource.connect();
      
    this.dataSource.paginator = this.paginator;
      //this.dataSource = new MatTableDataSource<Produto>();
      //console.log(this.dataSource)
    }, error => console.error(error.json()));
  }

  adicionarProdutoForm() {
    this.produtos.unshift(new Produto());
    this.changeDetectorRef.detectChanges();
      this.dataSource = new MatTableDataSource(this.produtos);
      this.obs = this.dataSource.connect();
      
    this.dataSource.paginator = this.paginator;
  }

  aoRemover(produtoRemovida) {
    this.produtos = this.produtos.filter(produto => produto !== produtoRemovida);
  }

  atualizaProduto(salvo) {
    console.log(salvo)
    if (salvo) {
      this.getProdutos();
      this.filtrar();
    }
  }

  getCategorias() {
    this.categoriaService.getCategorias().subscribe(data => {
      this.categorias = Lodash.orderBy(data.json(), 'nome', 'asc');
    }, error => console.error(error));
  }

  filtrar() {
    if (this.categoria) {
      this.produtoService.getProdutosPorCategoria(this.categoria.idCategoria).subscribe(data =>{
        this.changeDetectorRef.detectChanges();
        this.dataSource = new MatTableDataSource(data.json())
        this.obs = this.dataSource.connect();
        
      this.dataSource.paginator = this.paginator;
      }
        
      , error => console.error(error));
    } else {
      this.getProdutos();
    }
  }

  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }
}
