import { CategoriaService } from './../../../services/categoria.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Categoria } from '../../../models/categoria';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  @Output("salvarCategoria")
  categoriaSalva = new EventEmitter();

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
      console.log('teste')
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
          this.categoriaSalva.emit(true);
        }, error => {
          console.log(error.json());
        })
      } else {
        this.categoriaService.postCategoria(this.categoria).subscribe(data => {
          console.log(data.json())
          this.categoriaSalva.emit(true);
        }, error => {
          console.log(error.json());
        })
      }
    }
  }
}
