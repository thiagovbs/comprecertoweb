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
  mercadoProduto: MercadoProduto;
  @Input() 
  localidadeAtual:MercadoLocalidade;
  @Input()
  dtEntrada:number;

  categoriaId: number;
  categorias: Categoria[] = [];

  idSubcategoria: number;
  subcategorias: Subcategoria[] = [];

  //filtros
  filterProdutosPorSubcategoria: Produto[] = [];
  filterProdsPorMarca: Produto[] = [];
  filterProdsPorNome: Produto[] = [];
  filterProdsCaract: Produto[] = []
  filterProdsPorPeso: Produto[] = [];

  //Arrays para apresentar nos selects
  marcas: Array<string> = [];
  produtosNome: Array<string> = [];
  marcasNome: Array<string> = [];
  caracteristicasNome: Array<string> = [];
  unidadesMedida: Array<{ unidade: string, valor: number }> = [];
  preco:any
  boosts:Array<string>=["Nenhum","Destaque","Super Destaque"]
  
  formulario: FormGroup;


  hasEdit: boolean = true;
  myImage: string = null;

  

  constructor(private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private subcategoriaService: SubcategoriaService,
    private categoriaService: CategoriaService,
    private mercadoProdutoService:MercadoProdutoService) {

    this.formulario = this.formBuilder.group({
      categoria: [{ value: '' }, [Validators.required]],
      subcategoria: [{ value: '' }, [Validators.required]],
      marca: [{ value: '', disable: true }, [Validators.required]],
      caracteristica: ['', [Validators.required]],
      produto: [{ value: '', disable: true }, [Validators.required]],
      peso: [{ value: '', disable: true }, [Validators.required]],
      preco: [{value:''}, [Validators.required]],
      observacao: [{ value: '' }],
      boost: [{ value: '', disable: true }, [Validators.required]]
    });
  }

  ngOnInit() {
    console.log( this.dtEntrada);
    this.getCategorias();

    if (this.mercadoProduto.idMercadoProduto) {
      this.formulario.disable();
      this.hasEdit = false;
    }
  }

  getCategorias() {
    this.categoriaService.getCategorias().subscribe((data: any) => {
      this.categorias = Lodash.orderBy(data.json(), 'nome', 'asc');
    }, error => console.log(error))
  }

  //atualiza o select da CATEGORIA para habilitar as SUBCATEGORIAS
  atualizaCategoriaSelect(categoria: Categoria) {

    //zerando os filtros de produtos
    this.filterProdutosPorSubcategoria = [];
    this.filterProdsPorMarca = [];
    this.filterProdsPorNome = [];
    this.filterProdsCaract = [];

    //zerando os nomes de produtos
    this.produtosNome = [];
    this.marcasNome = [];
    this.caracteristicasNome = [];
    this.unidadesMedida = [];

    this.subcategorias = categoria.subcategorias;
    this.categoriaId = categoria.idCategoria
   
  }

  //atualiza o select da SUBCATEGORIA para habilitar as Marcas
  atualizaSubcategoriaSelect(subcategoria: Subcategoria) {
    
    //zerando os filtros de produtos
    this.filterProdutosPorSubcategoria = [];
    this.filterProdsPorMarca = [];
    this.filterProdsPorNome = [];
    this.filterProdsCaract = [];

    //zerando os nomes de produtos
    this.produtosNome = [];
    this.marcasNome = [];
    this.caracteristicasNome = [];
    this.unidadesMedida = [];

    this.idSubcategoria = subcategoria.idSubcategoria
    
    //pega as marca pelas subcategorias
    this.getMarcasPorSubcategoria(subcategoria.idSubcategoria);
    //pega os produtos pelas subcategorias
    this.getProdutosPorSubcategorias(subcategoria);
  }

  private getProdutosPorSubcategorias(subcategoria: Subcategoria) {
    let produtos: Produto[];
    //serviços que pega os produtos por categoria
    console.log(this.categoriaId)
    this.subcategoriaService.getProdutosPorCategorias(this.categoriaId).subscribe(data => {
      produtos = data.json();

      //filtra todos os produtos por subcategorias
      this.filterProdutosPorSubcategoria = produtos.filter((prod: Produto) => prod.subcategoria.nome === subcategoria.nome);

    }, erro => { console.log(erro) })
  }

  private getMarcasPorSubcategoria(idSubcategoria) {

    this.produtoService.getMarcasPorSubcategoria(idSubcategoria).subscribe(data => {
      this.marcas = data.json();
      
      //adicionar filtro para não repetir marcas com o mesmo nome  
      this.marcas.filter((marca) => this.marcasNome.push(marca))
      this.marcasNome = this.marcasNome.filter((nome, i, el) => {
        return i === el.indexOf(nome)
      })
    }, erro => { console.log(erro) })
  }

  //Ao Atualizar o select da marca, preencher o select dos produtos
  atualizaMarcaSelect(marca) {

    //zerando os filtros de produtos  
    this.filterProdsPorNome = [];
    this.filterProdsCaract = [];
    //zerando os nomes de produtos
    //this.produtosNome = [];
    this.caracteristicasNome = [];
    this.unidadesMedida = [];

    //filtro para pegar os produtos pelas marcas
    this.filterProdsPorMarca = this.filterProdutosPorSubcategoria.filter((prod: Produto) => {
      return prod.marca === marca;
    });
    //filtro os nomes dos produtos pelas marcas
    this.filterProdsPorMarca.filter((prod: Produto) => {
      this.produtosNome.push(prod.nome)
    })
    //filtro para não repetir os dos nomes dos produtos
    this.produtosNome = this.produtosNome.filter((nome, i, el) => {
      return i === el.indexOf(nome)
    })

  }

  //Ao Atualizar os produtos, preencher o select das características 
  atualizaProdutoSelect(produtoNome: string) {

    //zerando os filtros de produtos  
    this.filterProdsCaract = [];

    //zerando os nomes de produtos
    this.caracteristicasNome = [];

    this.filterProdsPorNome = this.filterProdsPorMarca.filter((prod: Produto) => prod.nome === produtoNome)

    this.filterProdsPorNome.filter((prod: Produto) => {
      this.caracteristicasNome.push(prod.caracteristica);
    })
    this.caracteristicasNome = this.caracteristicasNome.filter((nome, i, el) => {
      return i === el.indexOf(nome)
    })
  }

  atualizaCaracteristicaSelect(caracteristica: string) {

    //zerando os nomes de produtos
    this.unidadesMedida = [];

    this.filterProdsCaract = this.filterProdsPorNome.filter((prod: Produto) => prod.caracteristica === caracteristica)
    this.filterProdsCaract.filter((prod: Produto) => {
      this.unidadesMedida.push({
        unidade: prod.unidadeMedida.sigla,
        valor: prod.quantidade
      })
    })
    this.unidadesMedida.filter((nome, i, el) => {
      return i === el.indexOf(nome)
    })
  }

  atualizaPesoSelect(value: any) {
    //this.filterProdsPorPeso[0]
    this.filterProdsPorPeso = this.filterProdsCaract.
      filter((prod: Produto) => prod.quantidade === value.valor && prod.unidadeMedida.sigla === value.unidade)
    this.myImage = `${environment.urlS3}/prod` + this.filterProdsPorPeso[0].idProduto + `.jpg`
    console.log(this.myImage)
  }


  btnSalvar() {
    this.mercadoProduto.produto = this.filterProdsPorPeso[0];
    this.mercadoProduto.mercadoLocalidade = this.localidadeAtual;
    this.mercadoProduto.preco = this.formulario.get('preco').value;
    this.mercadoProduto.observacao = this.formulario.get('observacao').value;
    this.mercadoProduto.dtEntrada = this.dtEntrada;
    
    if(this.formulario.get('boost').value === 'Nenhum'){
      this.mercadoProduto.fDestaque = false;
      this.mercadoProduto.fSuperDestaque = false  
    }else if(this.formulario.get('boost').value === 'Destaque'){
      this.mercadoProduto.fDestaque = true;
      this.mercadoProduto.fSuperDestaque = false  
    }else if(this.formulario.get('boost').value === 'Super Destaque'){
      this.mercadoProduto.fDestaque = false;
      this.mercadoProduto.fSuperDestaque = true;  
    }
    console.log(this.mercadoProduto)
    this.mercadoProdutoService.salvarProdutosNoMercado(this.mercadoProduto)
    .subscribe(resp=>{
      swal('Atualização', `O produto ${this.mercadoProduto.produto.nome} foi atualizado!`, "success")
      console.log(resp.json())
    },erro=>{
      console.log(erro)
    })
    
  }

}
