import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Produto } from '../../../models/produto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProdutoService } from '../../../services/produto.service';

import { Subcategoria } from '../../../models/subcategoria';
import { SubcategoriaService } from '../../../services/subcategoria.service';

import Swal from 'sweetalert2';
import * as Lodash from 'lodash';
import { UnidadeMedidaService } from '../../../services/unidade-medida.service';
import { UnidadeMedida } from '../../../models/unidade-medida';

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

  constructor(private formBuilder: FormBuilder, private produtoService: ProdutoService, private subcategoriaService: SubcategoriaService,
    private unidadeMedidaService: UnidadeMedidaService) {

    this.formulario = this.formBuilder.group({
      caracteristica: ['', [Validators.required]],
      // imagem: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      quantidade: ['', [Validators.required, Validators.min(0.1)]],
      subcategoria: ['', [Validators.required]],
      unidadeMedida: [{ value: '', disable: true }, [Validators.required]]
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
      console.log(this.produto)
      this.produtoRemovida.emit(this.produto);
    }
  }

  salvar() {
    if (this.formulario.valid) {
      this.produto.imagem = 'teste';
      if (this.produto.idProduto) {
        this.produtoService.putProduto(this.produto).subscribe(data => {
          console.log(data.json())
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
          console.log(data.json())
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
          console.log(data.json());
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
      this.subcategorias = Lodash.orderBy(data.json(), 'idSubcategoria', 'desc');
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
}
