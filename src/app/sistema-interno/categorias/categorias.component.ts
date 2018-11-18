import { CategoriaService } from './../../services/categoria.service';
import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../models/categoria';

import * as Lodash from "lodash";

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.getCategorias();
  }

  getCategorias() {
    this.categoriaService.getCategorias().subscribe(data => {
      this.categorias = Lodash.orderBy(data.json(), 'idCategoria', 'desc')
    }, error => console.log(error.json()));
  }

  adicionarCategoriaForm() {
    this.categorias.unshift(new Categoria());
  }

  aoRemover(categoriaRemovida) {
    this.getCategorias();
  }

  aoSalvar(salvo) {
    if (salvo) {
      this.getCategorias();
    }
  }
}
