import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Produto } from '../../../models/produto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  @Input("produto")
  produto: Produto = new Produto();
  subcategorias: Subcategoria[] = [];
  unidadesMedida: UnidadeMedida[] = [];

  @Output("removerProduto")
  produtoRemovida = new EventEmitter();

  @Output("atualizaProduto")
  atualizaProduto = new EventEmitter();

  formulario: FormGroup;
  hasEdit: boolean = true;

  //upload file
  imageChangedEvent: File = null;
  croppedImage: any = '';
  fileToUpload: File


  bucketS3:string = environment.urlS3;

  constructor(private formBuilder: FormBuilder,
              private produtoService: ProdutoService, 
              private subcategoriaService: SubcategoriaService,
              private unidadeMedidaService: UnidadeMedidaService) {

    this.formulario = this.formBuilder.group({
      caracteristica: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      quantidade: ['', [Validators.required, Validators.min(0.1)]],
      subcategoria: ['', [Validators.required]],
      unidadeMedida: [{ value: '', disable: true }, [Validators.required]],
      imagem: ['', [Validators.required]]
    });
  }

  ngOnInit() {

    this.getSubcategorias();
    if (this.produto.idProduto) {
      this.getUnidadesMedidaPorSubcategoria(this.produto.subcategoria)
      this.formulario.disable();
      this.hasEdit = false;
    }

  }

  cancelar() {
    if (this.produto.idProduto) {
      this.formulario.disable();
      this.hasEdit = false
    } else {
      this.produtoRemovida.emit(this.produto);
    }
  }

  salvar() {
    this.produto.imagemUrl =this.formulario.value.imagem;
    if (this.formulario.valid) {
      if (this.produto.idProduto) {
        this.produtoService.putProduto(this.produto).subscribe(data => {
          this.sendImage();
          this.atualizaProduto.emit(true);
        }, error => {
          console.log(error.json());
        }, () => {
          this.formulario.disable();
          this.hasEdit = false;
          Swal('Atualização', `O produto ${this.produto.nome} foi atualizado!`, "success")
        })
      } else {
        this.produtoService.postProduto(this.produto).subscribe(data => {
          this.sendImage();
          this.atualizaProduto.emit(true);
        }, error => {
          console.log(error.json());
        }, () => {
          this.formulario.disable();
          this.hasEdit = false;
          Swal('Inclusão', `O produto ${this.produto.nome} foi salvo!`, "success")
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
      if (result.value) {
        this.produtoService.deleteProduto(this.produto.idProduto).subscribe(data => {
        }, error => {
          console.log(error.json())
        }, () => {
          this.atualizaProduto.emit(true);
          Swal('Exclusão', 'O produto foi deletado!', "success")
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
    console.log(event)
    this.croppedImage = event.base64;
  }

  //envia upload da imagem
  private sendImage() {
    if (this.croppedImage) {
      this.produtoService.postUploadFile(this.croppedImage).subscribe(resp => {
        console.log(resp)
      }, erro => {

      });
    }
  }
}
