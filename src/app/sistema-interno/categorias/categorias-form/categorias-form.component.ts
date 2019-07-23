import { CategoriaService } from './../../../services/categoria.service';
import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Categoria } from '../../../models/categoria';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { UnidadeMedida } from '../../../models/unidade-medida';
import { UnidadeMedidaService } from '../../../services/unidade-medida.service';

import Swal from 'sweetalert2';
import * as Lodash from 'lodash';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { environment } from '../../../../environments/environment';


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

  //upload file
  imageChangedEvent: File = null;
  croppedImage: any = '';
  myImage:string;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  constructor(
    private categoriaService: CategoriaService,
    private unidadeMedidaService: UnidadeMedidaService) {
    
  }

  ngOnInit() {
    if (this.categoria.idCategoria) {
      this.formulario = new FormGroup({
        fativo: new FormControl(''),
        nome:  new FormControl ('', [Validators.required]),
        imagem:  new FormControl('')
      });
      this.formulario.disable();
      this.hasEdit = false;
    }else{
      this.formulario = new FormGroup({
        fativo: new FormControl(''),
        nome:  new FormControl ('', [Validators.required]),
        imagem:  new FormControl('', [Validators.required])
      });
    }
    this.getUnidadesMedida();

    
    console.log(this.categoriaService.croppedFile +" meu produto")
    if(this.categoriaService.file === this.categoria.imagemUrl){
      this.myImage = this.categoriaService.croppedFile;
    }else{
      this.myImage = `${environment.urlS3}/cat${this.categoria.idCategoria}.jpg`;
    }
    
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
      let index = this.unidadesMedida.indexOf(this.unidadeMedidaSelecionada);
      if (index != 0)
        this.unidadesMedida.splice(index, 1);
    }
    this.unidadeMedidaSelecionada = undefined
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
      this.unidadesMedida.push(unidadeMedida);
      this.unidadesMedida = Lodash.orderBy(this.unidadesMedida, 'nome', 'asc');
    }
  }

  cancelar() {
    if (this.categoria.idCategoria) {
      this.formulario.disable();
      this.hasEdit = false
      this.atualizaCategoria.emit(true);
    } else {
      this.categoriaRemovida.emit(this.categoria);
    }
  }

  salvar() {
    if (this.formulario.valid) {
      if (this.listsValid()) {
        console.log(this.categoria.imagemUrl)
        if(this.formulario.value.imagem != ""){
          this.categoria.imagemUrl = this.formulario.value.imagem;
          this.sendImage()
        }
        
        if (this.categoria.idCategoria) {
          this.categoriaService.putCategoria(this.categoria).subscribe(data => {

            
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

            this.atualizaCategoria.emit(true);

            this.sendImage();

          }, error => {
            console.log(error);
          }, () => {
            this.formulario.disable();
            this.hasEdit = false;
            Swal('Inclusão', `A categoria ${this.categoria.nome} foi salva!`, "success")
          })
        }
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

  listsValid() {
    if (this.categoria.subcategorias.length === 0) {
      Swal('Erro', 'A categoria deve ter ao menos 1 subcategoria', 'error');
      return false;
    } else if (this.categoria.unidadesMedida.length === 0) {
      Swal('Erro', 'A categoria deve ter ao menos 1 unidade de medida', 'error');
      return false;
    }
    return true;
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.categoriaService.file = event.target.value;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.categoriaService.croppedFile = this.croppedImage;
  }

  //envia upload da imagem
  private sendImage() {
    this.categoriaService.postUploadFile().subscribe(resp => {
      console.log(resp)
    }, erro => { });
  }

}
