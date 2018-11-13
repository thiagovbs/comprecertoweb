import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Produto } from '../../../models/produto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProdutoService } from '../../../services/produto.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-produtos-form',
  templateUrl: './produtos-form.component.html',
  styleUrls: ['./produtos-form.component.css']
})
export class ProdutosFormComponent implements OnInit {

  @Input("produto")
  produto: Produto = new Produto();

  @Output("removerProduto")
  produtoRemovida = new EventEmitter();

  @Output("atualizaProduto")
  atualizaProduto = new EventEmitter();

  formulario: FormGroup;
  hasEdit: boolean = true;

  constructor(private formBuilder: FormBuilder, private produtoService: ProdutoService) {

    this.formulario = this.formBuilder.group({
      caracteristica: ['', [Validators.required]],
      imagem: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      quantidade: ['', [Validators.required, Validators.min(0.1)]],
      subcategoria: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    if (this.produto.idProduto) {
      console.log('teste')
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
      if (this.produto.idProduto) {
        this.produtoService.putProduto(this.produto).subscribe(data => {
          console.log(data.json())
          this.atualizaProduto.emit(true);
        }, error => {
          console.log(error.json());
        }, () => {
          this.formulario.disable();
          this.hasEdit = false;
          Swal('Atualização', `A produto ${this.produto.nome} foi atualizada!`)
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
          Swal('Inclusão', `A produto ${this.produto.nome} foi salva!`)
        })
      }
    }
  }

  deletar() {
    Swal({
      title: 'Exclusão de produto',
      text: `Deseja excluir a produto: ${this.produto.nome}?`,
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
          Swal('Exclusão', 'A produto foi deletada!')
        })
      }
    })
  }
}
