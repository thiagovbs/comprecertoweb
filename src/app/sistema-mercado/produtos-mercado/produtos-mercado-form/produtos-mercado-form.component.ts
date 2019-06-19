import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Produto } from '../../../models/produto';
import { Subcategoria } from '../../../models/subcategoria';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from '../../../services/produto.service';
import { SubcategoriaService } from '../../../services/subcategoria.service';

import * as Lodash from 'lodash';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria.service';
import { environment } from '../../../../environments/environment';
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

  @Output('atualizaMercadoProduto')
  atualizaMercadoProduto = new EventEmitter();
  @Output('removerMercadoProduto')
  removerMercadoProduto = new EventEmitter();

  produto: Produto = new Produto();
  produtos: Produto[] = [];
  produtoImagem: string = null;
  boostOn: number;

  categorias: Categoria[] = [];
  subcategorias: Subcategoria[] = [];
  marcas: Array<string> = [];
  produtosNome: Array<string> = [];
  caracteristicas: Array<string> = [];
  unidadesMedida: Array<{ unidade: string, valor: number }> = [];
  boosts: Array<any> = [
    { id: 1, name: 'Nenhum' },
    { id: 2, name: 'Destaque' },
  ];

  formulario: FormGroup;
  hasEdit = true;

  constructor(private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private subcategoriaService: SubcategoriaService,
    private categoriaService: CategoriaService,
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
      // set boost on select
      if (this.mercadoProduto.fDestaque == null && this.mercadoProduto.fSuperDestaque == null) {
        this.boostOn = 1;
      } else if (this.mercadoProduto.fDestaque) {
        this.boostOn = 2;
      }

      this.subcategorias = this.mercadoCategoria.subcategorias
      
      this.categoriaService.getCategoriaPorSubcategoria(this.mercadoProduto.produto.subcategoria.idSubcategoria)
      .subscribe(() => {
        this.formulario.get('subcategoria').setValue(this.mercadoProduto.produto.subcategoria.idSubcategoria);
        this.formulario.updateValueAndValidity();
        this.getMarcasPorSubcategoria(this.mercadoProduto.produto.subcategoria.idSubcategoria);
      })
      

    }else{
      this.subcategoriaService.getSubcategoriasByCategoria(this.mercadoCategoria.idCategoria)
      .subscribe((data) => {
        this.subcategorias =data.json()
        console.log(data.json())
        //this.getMarcasPorSubcategoria(this.mercadoProduto.produto.subcategoria.idSubcategoria);
      })
    }
  }

  getMarcasPorSubcategoria(idSubcategoria) {
    this.produtoService.getMarcasPorSubcategoria(idSubcategoria).subscribe(data => {
      this.marcas = data.json().filter((nome, i, el) => i === el.indexOf(nome));
    }, erro => console.error(erro)
      , () => {
        if (this.mercadoProduto.idMercadoProduto) {
          this.formulario.get('marca').setValue(this.mercadoProduto.produto.marca);
          this.formulario.updateValueAndValidity();

          this.getProdutosPorSubcategorias();
        }
      });
  }

  getProdutosPorSubcategorias() {
    this.subcategoriaService.getProdutosPorCategorias(this.mercadoCategoria.idCategoria).subscribe(data => {
      this.produtos = data.json();
      this.produtosNome = data.json()
        .filter((prod: Produto) => prod.marca === this.formulario.get('marca').value)
        .map((produto) => produto.nome)
        .filter((nome, i, el) => i === el.indexOf(nome));
    }, erro => console.error(erro)
      , () => {
        if (this.mercadoProduto.idMercadoProduto) {
          this.formulario.get('produto').setValue(this.mercadoProduto.produto.nome);
          this.formulario.updateValueAndValidity();

          this.atualizaProdutoSelect(this.mercadoProduto.produto.nome);
        }
      });
  }

  atualizaProdutoSelect(produtoNome: string) {
    this.caracteristicas = this.produtos
      .filter((prod: Produto) => prod.nome === produtoNome)
      .map(produto => produto.caracteristica)
      .filter((nome, i, el) => i === el.indexOf(nome));

    if (this.mercadoProduto.idMercadoProduto) {
      this.formulario.get('caracteristica').setValue(this.mercadoProduto.produto.caracteristica);
      this.formulario.updateValueAndValidity();

      this.atualizaCaracteristicaSelect(this.mercadoProduto.produto.caracteristica);
    }
  }

  atualizaCaracteristicaSelect(caracteristica: string) {
    this.unidadesMedida = this.produtos
      .filter((prod: Produto) => prod.caracteristica === caracteristica)
      .map((prod: Produto) => ({
        unidade: prod.unidadeMedida.sigla,
        valor: prod.quantidade
      }))
      .filter((nome, i, el) => i === el.indexOf(nome));

    if (this.mercadoProduto.idMercadoProduto) {
      this.formulario.get('peso').setValue(this.mercadoProduto.produto.quantidade);
      this.formulario.updateValueAndValidity();
    }
  }

  atualizaPesoSelect(value: any) {
    this.produto = this.produtos
      .filter((prod: Produto) => prod.caracteristica === this.formulario.get('caracteristica').value)
      .filter((prod: Produto) => prod.quantidade === value.valor && prod.unidadeMedida.sigla === value.unidade)[0];
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
    this.mercadoProduto.produto = this.produto;
    this.mercadoProduto.preco = this.formulario.get('preco').value;
    this.mercadoProduto.observacao = this.formulario.get('observacao').value;
    this.mercadoProduto.dtEntrada = this.dtEntrada;


    if (this.formulario.get('boost').value === 1) {
      this.mercadoProduto.fDestaque = false;
    } else if (this.formulario.get('boost').value === 2) {
      this.mercadoProduto.fDestaque = true;
    }
    
    if (this.mercadoProduto.idMercadoProduto) {
      this.mercadoProdutoService.putProdutosMercado(this.mercadoProduto).subscribe(data => {
        this.atualizaMercadoProduto.emit(true);
      }, error => {
        console.error(error.json());
      }, () => {
        this.formulario.disable();
        this.hasEdit = false;
        swal('Atualização', `O produto ${this.mercadoProduto.produto.marca} foi atualizado!`, 'success');
      });
    } else {
      this.mercadoProdutoService.salvarProdutosNoMercado(this.mercadoProduto)
        .subscribe(resp => {
          this.atualizaMercadoProduto.emit(true);
        }, erro => {
          console.error(erro.json());
        }, () => {
          this.formulario.disable();
          this.hasEdit = false;
          swal('Inclusão', `O produto ${this.mercadoProduto.produto.marca} foi salvo!`, 'success');
        });
    }
  }
}
