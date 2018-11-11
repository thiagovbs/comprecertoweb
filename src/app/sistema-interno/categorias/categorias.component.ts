import { CategoriaService } from './../../services/categoria.service';
import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../models/categoria';

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
    this.categoriaService.getCategorias().subscribe(data => this.categorias = data.json(), error => console.log(error.json()));
  }

  adicionarCategoriaForm() {
    this.categorias.push(new Categoria());
  }

  aoRemover(categoriaRemovida) {
    console.log(categoriaRemovida)
    this.categorias = this.categorias.filter(categoria => categoria != categoriaRemovida);
  }

  atualizaCategoria(salvo) {
    if (salvo) {
      this.getCategorias();
    }
  }
}
