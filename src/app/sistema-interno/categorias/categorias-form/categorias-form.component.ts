import { CategoriaService } from './../../../services/categoria.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Categoria } from '../../../models/categoria';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias-form',
  templateUrl: './categorias-form.component.html',
  styleUrls: ['./categorias-form.component.css']
})
export class CategoriasFormComponent implements OnInit {

  @Input("categoria")
  categoria: Categoria = new Categoria();

  @Output("removerCategoria")
  categoriaRemovida = new EventEmitter();

  @Output("atualizaCategoria")
  atualizaCategoria = new EventEmitter();

  formulario: FormGroup;
  hasEdit: boolean = true;

  constructor(private formBuilder: FormBuilder, private categoriaService: CategoriaService) {

    this.formulario = this.formBuilder.group({
      fativo: ['', [Validators.required]],
      nome: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    if (this.categoria.idCategoria) {
      this.formulario.disable();
      this.hasEdit = false;
    }
  }

  cancelar() {
    if (this.categoria.idCategoria) {
      this.formulario.disable();
      this.hasEdit = false
    } else {
      console.log(this.categoria)
      this.categoriaRemovida.emit(this.categoria);
    }
  }

  salvar() {
    if (this.formulario.valid) {
      if (this.categoria.idCategoria) {
        this.categoriaService.putCategoria(this.categoria).subscribe(data => {
          console.log(data.json())
          this.atualizaCategoria.emit(true);
        }, error => {
          console.log(error.json());
        }, () => {
          this.formulario.disable();
          this.hasEdit = false;
          Swal('Atualização', `A categoria ${this.categoria.nome} foi atualizada!`)
        })
      } else {
        this.categoriaService.postCategoria(this.categoria).subscribe(data => {
          console.log(data.json())
          this.atualizaCategoria.emit(true);
        }, error => {
          console.log(error.json());
        }, () => {
          this.formulario.disable();
          this.hasEdit = false;
          Swal('Inclusão', `A categoria ${this.categoria.nome} foi salva!`)
        })
      }
    }
  }

  deletar() {
    Swal({
      title: 'Exclusão de categoria',
      text: `Deseja excluir a categoria: ${this.categoria.nome}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.categoriaService.deleteCategoria(this.categoria.idCategoria).subscribe(data => {
          console.log(data.json());
        }, error => {
          console.log(error.json())
        }, () => {
          this.atualizaCategoria.emit(true);
          Swal('Exclusão', 'A categoria foi deletada!')
        })
      }
    })
  }
}
