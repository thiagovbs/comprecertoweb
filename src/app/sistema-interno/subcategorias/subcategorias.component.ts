import { Component, OnInit } from '@angular/core';
import { Subcategoria } from '../../models/subcategoria';
import { SubcategoriaService } from '../../services/subcategoria.service';

import * as Lodash from "lodash";

@Component({
  selector: 'app-subcategorias',
  templateUrl: './subcategorias.component.html',
  styleUrls: ['./subcategorias.component.css']
})
export class SubcategoriasComponent implements OnInit {

  subcategorias: Subcategoria[] = [];

  constructor(private categoriaService: SubcategoriaService) { }

  ngOnInit() {
    this.getSubcategorias();
  }

  getSubcategorias() {
    this.categoriaService.getSubcategorias().subscribe(data => {
      this.subcategorias = Lodash.orderBy(data.json(), 'idSubcategoria', 'desc');
    }, error => console.log(error.json()))
  }

  adicionarSubcategoriaForm() {
    this.subcategorias.unshift(new Subcategoria());
  }

  aoRemover(subcategoriaRemovida) {
    this.subcategorias = this.subcategorias.filter(subcategoria => subcategoria != subcategoriaRemovida);
  }

  aoSalvar(salvo) {
    if (salvo) {
      this.getSubcategorias();
    }
  }
}
