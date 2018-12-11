import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subcategoria } from '../../../models/subcategoria';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubcategoriaService } from '../../../services/subcategoria.service';

import { CategoriaService } from '../../../services/categoria.service';
import { Categoria } from '../../../models/categoria';

import Swal from 'sweetalert2';
import * as Lodash from 'lodash';

@Component({
  selector: 'app-subcategorias-form',
  templateUrl: './subcategorias-form.component.html',
  styleUrls: ['./subcategorias-form.component.css']
})
export class SubcategoriasFormComponent implements OnInit {

  @Input("subcategoria")
  subcategoria: Subcategoria = new Subcategoria();
  categorias: Categoria[] = [];

  @Output("removerSubcategoria")
  subcategoriaRemovida = new EventEmitter();

  @Output("atualizaSubcategoria")
  atualizaSubcategoria = new EventEmitter();

  formulario: FormGroup;
  hasEdit: boolean = true;

  constructor(private formBuilder: FormBuilder, private subcategoriaService: SubcategoriaService, private categoriaService: CategoriaService) {

    this.formulario = this.formBuilder.group({
      fativo: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      categoria: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.getCategorias();
    if (this.subcategoria.idSubcategoria) {
      this.formulario.disable();
      this.hasEdit = false;
    }
  }

  cancelar() {
    if (this.subcategoria.idSubcategoria) {
      this.formulario.disable();
      this.hasEdit = false
    } else {
      this.subcategoriaRemovida.emit(this.subcategoria);
    }
  }

  salvar() {
    if (this.formulario.valid) {
      if (this.subcategoria.idSubcategoria) {
        this.subcategoriaService.putSubcategoria(this.subcategoria).subscribe(data => {
          this.atualizaSubcategoria.emit(true);
        }, error => {
          console.log(error.json());
        }, () => {
          this.formulario.disable();
          this.hasEdit = false;
          Swal('Atualização', `A subcategoria ${this.subcategoria.nome} foi atualizada!`, "success")
        })
      } else {
        this.subcategoriaService.postSubcategoria(this.subcategoria).subscribe(data => {
          this.atualizaSubcategoria.emit(true);
        }, error => {
          console.log(error.json());
        }, () => {
          this.formulario.disable();
          this.hasEdit = false;
          Swal('Inclusão', `A subcategoria ${this.subcategoria.nome} foi salva!`, "success")
        })
      }
    }
  }

  excluir() {
    Swal({
      title: 'Exclusão de subcategoria',
      text: `Deseja excluir a subcategoria: ${this.subcategoria.nome}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.subcategoriaService.deleteSubcategoria(this.subcategoria.idSubcategoria).subscribe(data => {
          console.log(data.json());
        }, error => {
          console.log(error.json())
        }, () => {
          this.atualizaSubcategoria.emit(true);
          Swal('Exclusão', 'A subcategoria foi deletada!', "success")
        })
      }
    })
  }

  getCategorias() {
    this.categoriaService.getCategorias().subscribe(data => {
      this.categorias = Lodash.orderBy(data.json(), 'nome', 'asc');
    }, error => console.log(error));
  }

  atualizaCategoriaSelect(value) {
    // this.subcategoria.categoria = this.categorias.filter(categoria => categoria.idCategoria = value)[0];
  }
}
