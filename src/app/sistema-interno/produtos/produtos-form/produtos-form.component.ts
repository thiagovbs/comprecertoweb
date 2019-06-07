import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Produto } from '../../../models/produto';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProdutoService } from '../../../services/produto.service';

import { Subcategoria } from '../../../models/subcategoria';
import { SubcategoriaService } from '../../../services/subcategoria.service';
import { UnidadeMedidaService } from '../../../services/unidade-medida.service';
import { UnidadeMedida } from '../../../models/unidade-medida';

import Swal from 'sweetalert2';
import * as Lodash from 'lodash';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-produtos-form',
  templateUrl: './produtos-form.component.html',
  styleUrls: ['./produtos-form.component.css']
})
export class ProdutosFormComponent implements OnInit {

  loading = false;

  @Input("produto")
  produto: Produto = new Produto();
  subcategorias: Subcategoria[] = [];
  unidadesMedida: UnidadeMedida[] = [];

  @Output("removerProduto")
  produtoRemovida = new EventEmitter();

  @Output("salvarProduto")
  atualizaProduto = new EventEmitter();

  formulario: FormGroup;
  hasEdit: boolean = true;

  //upload file
  imageChangedEvent: File = null;
  croppedImage: any = '';
  fileToUpload: File

  myImage: string;

  constructor(private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private subcategoriaService: SubcategoriaService,
    private unidadeMedidaService: UnidadeMedidaService) {

    this.formulario = new FormGroup({
      caracteristica: new FormControl ('', [Validators.required]),
      marca: new FormControl ('', [Validators.required]),
      nome: new FormControl ('', [Validators.required]),
      quantidade: new FormControl ('', [Validators.required, Validators.min(0.1)]),
      subcategoria: new FormControl ('', [Validators.required]),
      unidadeMedida: new FormControl ({ value: '', disable: true }, [Validators.required]),
      imagem: new FormControl ('', [Validators.required])
    });
  }

  ngOnInit() {

    this.getSubcategorias();

    if (this.produto.idProduto) {

      this.getUnidadesMedidaPorSubcategoria(this.produto.subcategoria)
      this.formulario.disable();
      this.hasEdit = false;
      
      this.formulario = new FormGroup({
        caracteristica: new FormControl ('', [Validators.required]),
        marca: new FormControl ('', [Validators.required]),
        nome: new FormControl ('', [Validators.required]),
        quantidade: new FormControl ('', [Validators.required, Validators.min(0.1)]),
        subcategoria: new FormControl ('', [Validators.required]),
        unidadeMedida: new FormControl ({ value: '', disable: true }, [Validators.required]),
        imagem: new FormControl ('')
      });
      
    }

    this.myImage = this.produto.imagemUrl;

  }

  cancelar() {
    this.produtoService.croppedFile = null
    if (this.produto.idProduto) {
      this.formulario.disable();
      this.hasEdit = false;
      this.atualizaProduto.emit(true);

      this.myImage = this.produto.imagemUrl;
    } else {
      this.produtoRemovida.emit(this.produto);
    }
  }

  salvar() {
    this.loading = true;
    this.produto.imageBase64 = this.produtoService.croppedFile

    if (this.formulario.valid) {
      if (this.produto.idProduto) {
        this.produtoService.putProduto(this.produto).subscribe(data => {

          this.loading = false;
          Swal('Atualização', `O produto ${this.produto.nome} foi atualizado!`, "success")
          this.atualizaProduto.emit(true);
        }, error => {
          this.loading = false;
          Swal('Atualização', `O produto ${this.produto.nome} NÃO foi atualizado!`, "warning")

        }, () => {
          this.formulario.disable();
          this.hasEdit = false;
        })
      } else {
        this.produtoService.postProduto(this.produto).subscribe(() => {

          this.loading = false;
          Swal('Inclusão', `O produto ${this.produto.nome} foi salvo!`, "success")
          this.atualizaProduto.emit(true);
        }, error => {
          this.loading = false;
          Swal('Inclusão', `O produto ${this.produto.nome} NÃO foi salvo!`, "warning")
        }, () => {
          this.formulario.disable();
          this.hasEdit = false;
        })
      }
    }
  }

  excluir() {

    Swal({
      title: 'Exclusão de produto',
      text: `Deseja excluir o produto: ${this.produto.nome}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      this.loading = true;
      if (result.value) {
        this.produtoService.deleteProduto(this.produto.idProduto).subscribe(data => {
          console.log(data)
          this.loading = false;
          Swal('Exclusão', 'O produto foi excluído!', "success")
          this.atualizaProduto.emit(true);

        }, error => {
          Swal('Exclusão', 'O produto não pode ser excluído, tente mais tarde!', "warning")
          this.loading = false;
          console.log(error.json())
        })
      }
    })
  }

  getSubcategorias() {
    this.subcategoriaService.getSubcategorias().subscribe(data => {
      this.subcategorias = Lodash.orderBy(data.json(), 'nome', 'asc');
    }, error => console.log(error))
  }

  atualizaSubcategoriaSelect(value) {
    this.produto.subcategoria = this.subcategorias.filter(subcategoria => subcategoria.idSubcategoria = value)[0];

    this.getUnidadesMedidaPorSubcategoria(this.produto.subcategoria);
  }

  getUnidadesMedidaPorSubcategoria(subcategoria: Subcategoria) {
    this.formulario.get('unidadeMedida').enabled;

    this.unidadeMedidaService.getUnidadesMedidaPorSubcategoria(subcategoria).subscribe(data => {
      this.unidadesMedida = data.json();
    })
  }

  atualizaUnidadeMedidaSelect(value) {
    this.produto.unidadeMedida = this.unidadesMedida.filter(unidadeMedida => unidadeMedida.idUnidade = value)[0];
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.produtoService.croppedFile = this.croppedImage;
    //pega a imagem que for croppada e atualiza na tela
    this.myImage = this.produtoService.croppedFile;
  }

  loadImageFailed() {

  }
}
