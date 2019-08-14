import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Produto } from '../../../models/produto';
import { Subcategoria } from '../../../models/subcategoria';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from '../../../services/produto.service';
import { SubcategoriaService } from '../../../services/subcategoria.service';
import { Categoria } from '../../../models/categoria';

import { MercadoProduto } from '../../../models/mercado-produto';
import { MercadoLocalidade } from '../../../models/mercado-localidade';
import { MercadoProdutoService } from '../../../services/mercado-produto.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-produtos-mercado-form',
  templateUrl: './produtos-mercado-form.component.html',
  styleUrls: ['./produtos-mercado-form.component.css']
})
export class ProdutosMercadoFormComponent implements OnInit {

  @Input()
  mercadoProduto: MercadoProduto = new MercadoProduto();
  @Input()
  mercadoCategoria: Categoria = {} as Categoria;
  @Input()
  localidadeAtual: MercadoLocalidade;
  @Input()
  dtEntrada: Date;

  @Input()
  qntBoostRestante: number;

  @Output('salvarMercadoProduto')
  atualizaMercadoProduto = new EventEmitter();

  @Output('removerMercadoProduto')
  removerMercadoProduto = new EventEmitter();

  produto: Produto = new Produto();
  produtos: Produto[] = [];
  produtoImagem: string = null;

  @Output('boostEmitter')
  boostEmitter = new EventEmitter();

  boostOn: any;
  categorias: Categoria[] = [];
  subcategorias: Subcategoria[] = [];
  marcas: Array<string> = [];
  produtosNome: Array<string> = [];
  caracteristicas: Array<string> = [];
  unidadesMedida: Array<{ unidadeMedida: string, quantidade: number }> = [];
  boosts: Array<any> = [
    { id: 1, name: 'Nenhum' },
    { id: 2, name: 'Destaque' },
  ];

  formulario: FormGroup;
  hasEdit = true;

  constructor(private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private subcategoriaService: SubcategoriaService,
    private mercadoProdutoService: MercadoProdutoService
  ) {

    this.formulario = this.formBuilder.group({
      subcategoria: [{ value: '' }, [Validators.required]],
      marca: [{ value: '', disable: true }, [Validators.required]],
      caracteristica: ['', [Validators.required]],
      produto: [{ value: '', disable: true }, [Validators.required]],
      peso: [{ value: '', disable: true }, [Validators.required]],
      preco: [{ value: '' }, [Validators.required]],
      observacao: [{ value: '' }],
      boost: [{ value: '', disable: true }, [Validators.required]]
    });
  }

  ngOnInit() {

    // pegando os produtos dos mercados listados
    if (this.mercadoProduto.idMercadoProduto) {
      this.produtoImagem = this.mercadoProduto.produto.imagemUrl
      this.formulario.disable();
      this.hasEdit = false;
      this.subcategorias = this.mercadoCategoria.subcategorias

      this.getProdutosPorSubcategorias(this.mercadoCategoria.idCategoria);
      this.getMarcasPorSubcategoria(this.mercadoProduto.produto.subcategoria.idSubcategoria);
      this.getUnidadesDeMedidaPorSubCategoriaEMarca(this.mercadoProduto.produto.subcategoria.idSubcategoria, this.mercadoProduto.produto.marca)

      this.formulario.get('subcategoria').setValue(this.mercadoProduto.produto.subcategoria.idSubcategoria);
      this.formulario.get('produto').setValue(this.mercadoProduto.produto.nome);
      this.formulario.get('marca').setValue(this.mercadoProduto.produto.marca);
      this.formulario.get('caracteristica').setValue(this.mercadoProduto.produto.caracteristica);
      this.formulario.get('peso').setValue(this.mercadoProduto.produto.unidadeMedida.sigla);
      this.formulario.get('observacao').setValue(this.mercadoProduto.observacao);
      this.formulario.get('preco').setValue(this.mercadoProduto.preco);


      if (this.mercadoProduto.fdestaque) {
        this.boostOn = 2;
      } else {
        this.boostOn = 1;
      }
      this.formulario.updateValueAndValidity();
    } else {
      this.subcategoriaService.getSubcategoriasByCategoria(this.mercadoCategoria.idCategoria)
        .subscribe((data) => {
          this.subcategorias = data.json()
        })
    }
  }

  getProdutosPorSubcategorias(idCategoria) {

    this.subcategoriaService.getProdutosPorCategorias(idCategoria).subscribe(data => {
      this.produtos = data.json();
      this.produtosNome = data.json()
        .filter((prod: Produto) => prod.marca === this.formulario.get('marca').value)
        .map((produto) => produto.nome)
        .filter((nome, i, el) => i === el.indexOf(nome));
      //pegar as caracteristicas pelos produtos  
      this.caracteristicas = data.json().filter((prod: Produto) => prod.marca == this.formulario.get('marca').value)
        .map((produto: Produto) => produto.caracteristica)
    }, erro => console.error(erro));

  }

  getMarcasPorSubcategoria(idSubcategoria) {
    this.produtoService.getMarcasPorSubcategoria(idSubcategoria).subscribe(data => {
      this.marcas = data.json().filter((nome, i, el) => i === el.indexOf(nome));
    }, erro => console.error(erro))
  }

  getUnidadesDeMedidaPorSubCategoriaEMarca(idSubcategoria: number, marca: string) {
    this.produtoService.getUnidadesMedidaPorSubcategoriaEMarca(idSubcategoria, marca).subscribe((resp) => {
      this.unidadesMedida = resp.json();
    })
  }



  atualizaMarcasPorSubcategoria(idSubcategoria) {
    this.produto = new Produto();
    this.produtoImagem = undefined;
    this.caracteristicas = []
    this.unidadesMedida = []
    this.produtosNome = []
    this.produtoService.getMarcasPorSubcategoria(idSubcategoria).subscribe(data => {
      this.marcas = data.json().filter((nome, i, el) => i === el.indexOf(nome));
    }, erro => console.error(erro))
  }

  atualizaMarcasPorSubcategorias(marca: string) {
    this.produto = new Produto();
    this.produtoImagem = undefined;
    this.caracteristicas = []
    this.unidadesMedida = []
    this.produtosNome = []

    this.subcategoriaService.getProdutosPorCategorias(this.mercadoCategoria.idCategoria).subscribe(data => {
      this.produtos = data.json();
      this.produtosNome = data.json()
        .filter((prod: Produto) => prod.marca === marca)
        .map((produto) => produto.nome)
        .filter((nome, i, el) => i === el.indexOf(nome));
    });
  }

  atualizaProdutoPorMarca(produtoNome: string) {
    this.produto = new Produto();
    this.unidadesMedida = []
    this.produtoImagem = undefined;

    this.caracteristicas = this.produtos
      .filter((prod: Produto) => prod.nome === produtoNome)
      .map(produto => produto.caracteristica)
      .filter((nome, i, el) => i === el.indexOf(nome));

  }

  atualizaCaracteristicaPorProduto(caracteristica: string) {
    this.produto = new Produto();
    this.produtoImagem = undefined;

    this.unidadesMedida = this.produtos
      .filter((prod: Produto) => prod.caracteristica === caracteristica)
      .map((prod: Produto) => ({
        unidadeMedida: prod.unidadeMedida.sigla,
        quantidade: prod.quantidade
      }))
      .filter((nome, i, el) => i === el.indexOf(nome));
  }

  atualizaPesoCaracteristica(value: any) {
    this.produto = this.produtos
      .filter((prod: Produto) => prod.caracteristica === this.formulario.get('caracteristica').value)
      .filter((prod: Produto) => prod.quantidade === value.quantidade && prod.unidadeMedida.sigla === value.unidadeMedida)[0];

    this.produtoImagem = this.produto.imagemUrl;
  }

  cancelar() {
    if (this.mercadoProduto.idMercadoProduto) {
      this.formulario.disable();
      this.hasEdit = false;
      this.atualizaMercadoProduto.emit(true);
    } else {
      this.removerMercadoProduto.emit(this.mercadoProduto);
    }
  }

  btnSalvar() {

    this.mercadoProduto.mercadoLocalidade = this.localidadeAtual;

    if (this.produto.idProduto) {
      this.mercadoProduto.produto = this.produto;
    }
    this.mercadoProduto.preco = this.formulario.get('preco').value;
    this.mercadoProduto.observacao = this.formulario.get('observacao').value;

    if (!this.formulario.get('observacao').touched) {
      this.mercadoProduto.observacao = "";
    }

    this.mercadoProduto.dtEntrada = this.dtEntrada;

    if (this.formulario.get('boost').value === 2)
      this.mercadoProduto.fdestaque = true;
    else
      this.mercadoProduto.fdestaque = false;


    if (this.mercadoProduto.idMercadoProduto) {

      this.mercadoProdutoService.putProdutosMercado(this.mercadoProduto).subscribe(data => {
        this.atualizaMercadoProduto.emit(true);
      }, error => {
        console.error(error.json());
        swal('Preencha os campos', `O produto não pode ser atualizado!`, 'warning');
      }, () => {
        this.formulario.disable();
        this.hasEdit = false;
        swal('Atualização', `O produto ${this.mercadoProduto.produto.marca} foi atualizado!`, 'success');
      });

    } else {
      this.mercadoProdutoService.salvarProdutosNoMercado(this.mercadoProduto)
        .subscribe(resp => {
          this.atualizaMercadoProduto.emit(this.mercadoProduto);
        }, erro => {
          swal('Preencha os campos', `O produto não pode ser atualizado!`, 'warning');
          console.error(erro.json());
        }, () => {
          this.formulario.disable();
          this.hasEdit = false;
          swal('Inclusão', `O produto ${this.mercadoProduto.produto.marca} foi salvo!`, 'success');
        });
    }
  }

  excluir() {

    this.mercadoProdutoService.deleteMercadoProduto(this.mercadoProduto.idMercadoProduto).subscribe(data => {
      this.removerMercadoProduto.emit(this.mercadoProduto);
      swal('Exclusão', `O produto ${this.mercadoProduto.produto.marca} foi Excluído!`, 'success');

    }, error => {
      console.error(error.json());
      swal('Preencha os campos', `O produto não pode ser atualizado!`, 'warning');
    });
  }

  boostSelect(boost: any) {

    if (this.mercadoProduto.fdestaque && boost.id === 1) {
      this.boostEmitter.emit(boost.id)
    } else if (!this.mercadoProduto.fdestaque && boost.id === 2) {
      this.boostEmitter.emit(boost.id)
    }

    if (this.formulario.get('boost').value === 2) {
      console.log("true")
      this.mercadoProduto.fdestaque = true;
    } else {
      console.log("false")
      this.mercadoProduto.fdestaque = false;
    }
  }


}
