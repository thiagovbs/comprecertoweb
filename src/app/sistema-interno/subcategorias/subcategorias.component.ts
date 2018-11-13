import { Component, OnInit } from '@angular/core';
import { Subcategoria } from '../../models/subcategoria';
import { SubcategoriaService } from '../../services/subcategoria.service';

@Component({
  selector: 'app-subcategorias',
  templateUrl: './subcategorias.component.html',
  styleUrls: ['./subcategorias.component.css']
})
export class SubcategoriasComponent implements OnInit {

  subcategoria: Subcategoria[] = [];

  constructor(private categoriaService: SubcategoriaService) { }

  ngOnInit() {
    this.getSubcategorias();
  }

  getSubcategorias() {
    this.categoriaService.getSubcategorias().subscribe(data => this.subcategoria = data.json(), error => console.log(error.json()));
  }

  adicionarSubcategoriaForm() {
    this.subcategoria.push(new Subcategoria());
  }

  aoRemover(subcategoriaRemovida) {
    console.log(subcategoriaRemovida)
    this.subcategoria = this.subcategoria.filter(subcategoria => subcategoria != subcategoriaRemovida);
  }

  atualizaSubcategoria(salvo) {
    if (salvo) {
      this.getSubcategorias();
    }
  }
}
