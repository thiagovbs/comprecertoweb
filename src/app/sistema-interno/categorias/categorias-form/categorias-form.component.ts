import { CategoriaService } from './../../../services/categoria.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Categoria } from '../../../models/categoria';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { UnidadeMedida } from '../../../models/unidade-medida';

import Swal from 'sweetalert2';
import { UnidadeMedidaService } from '../../../services/unidade-medida.service';

@Component({
  selector: 'app-categorias-form',
  templateUrl: './categorias-form.component.html',
  styleUrls: ['./categorias-form.component.css']
})
export class CategoriasFormComponent implements OnInit {

  @Input("categoria")
  categoria: Categoria = new Categoria();
  unidadesMedida: UnidadeMedida[] = [];
  unidadeMedidaSelecionada: UnidadeMedida;

  @Output("removerCategoria")
  categoriaRemovida = new EventEmitter();

  @Output("atualizaCategoria")
  atualizaCategoria = new EventEmitter();

  formulario: FormGroup;
  hasEdit: boolean = true;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  constructor(private formBuilder: FormBuilder, private categoriaService: CategoriaService, private unidadeMedidaService: UnidadeMedidaService) {

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

    this.getUnidadesMedida();
  }

  getUnidadesMedida() {
    this.unidadeMedidaService.getUnidadesMedida().subscribe(data => {
      this.unidadesMedida = data.json();
    }, error => console.log(error));
  }

  addSubcategoria(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.categoria.subcategorias.push({
        idSubcategoria: undefined,
        nome: value,
        fativo: true
      })
    }

    if (input) {
      input.value = '';
    }
  }

  addUnidadeMedida(): void {
    if (!this.categoria.unidadesMedida.includes(this.unidadeMedidaSelecionada)) {
      this.categoria.unidadesMedida.push(this.unidadeMedidaSelecionada);
    }
  }

  removeSubcategoria(subcategoria: any): void {
    const index = this.categoria.subcategorias.indexOf(subcategoria);

    if (index >= 0) {
      this.categoria.subcategorias.splice(index, 1);
    }
  }

  removeUnidadeMedida(unidadeMedida: any): void {
    const index = this.categoria.unidadesMedida.indexOf(unidadeMedida);

    if (index >= 0) {
      this.categoria.unidadesMedida.splice(index, 1);
    }
  }

  cancelar() {
    if (this.categoria.idCategoria) {
      this.formulario.disable();
      this.hasEdit = false
      this.atualizaCategoria.emit(true);
    } else {
      console.log(this.categoria)
      this.categoriaRemovida.emit(this.categoria);
    }
  }

  salvar() {
    if (this.formulario.valid) {
      if (this.categoria.idCategoria) {
        console.log(this.categoria)
        this.categoriaService.putCategoria(this.categoria).subscribe(data => {
          console.log(data.json())
          this.atualizaCategoria.emit(true);
        }, error => {
          console.log(error.json());
        }, () => {
          this.formulario.disable();
          this.hasEdit = false;
          Swal('Atualização', `A categoria ${this.categoria.nome} foi atualizada!`, "success")
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
          Swal('Inclusão', `A categoria ${this.categoria.nome} foi salva!`, "success")
        })
      }
    }
  }

  excluir() {
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
          Swal('Exclusão', 'A categoria foi deletada!', "success")
        })
      }
    })
  }

  mostrarUnidadesMedidas() {
    Swal({
      title: '<strong>HTML <u>example</u></strong>',
      type: 'info',
      html:
        '<mat-checkbox class="example-margin">Ativo</mat-checkbox>',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
        '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: 'Thumbs down',
    });
  }
}
