import { Component, OnInit } from '@angular/core';
import { MercadoProduto } from '../../models/mercado-produto';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MercadoLocalidade } from '../../models/mercado-localidade';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material';
import { MercadoProdutoService } from '../../services/mercado-produto.service';
import { Estado } from '../../models/estado';
import { EstadoService } from '../../services/estado.service';
import { Cidade } from '../../models/cidade';
import { Bairro } from '../../models/bairro';
import { CidadeService } from '../../services/cidade.service';
import { BairroService } from '../../services/bairro.service';
import { MercadoLocalidadeService } from '../../services/mercado-localidade.service';
import { UsuarioService } from '../../services/usuario.service';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria';
import { Subcategoria } from '../../models/subcategoria';
import swal from 'sweetalert2';


@Component({
  selector: 'app-produtos-mercado',
  templateUrl: './produtos-mercado.component.html',
  styleUrls: ['./produtos-mercado.component.css']
})
export class ProdutosMercadoComponent implements OnInit {

  produtosTotal: number
  boostTotal: number =0;
  qntBoostRestante: number =0;
  mercadoprodutos: MercadoProduto[] = [];
  localidadeAtual: MercadoLocalidade;
  localStorageAlcanceEDataEntrada: { bairro: Bairro, dataEntrada }
  maxDate: Date = new Date();
  dtEntrada: any;
  minDate: Date = new Date();
  //listas
  listaEstados: Estado[] = [];
  listaCidades: Cidade[] = [];
  listaBairros: Bairro[] = [];
  listaCategorias: Categoria[] = [];


  categoriaEscolhida: Categoria;
  idBairro: number;
  idMercado: number;
  qtdProdutosPacote: number=0;
  qtdBoostPacote: number=0;

  public totalPorCategoriasMap: Map<Categoria, number> = new Map<Categoria, number>();

  //booleano
  temProduto: boolean = false;

  formLocalidade: FormGroup;
  alcance: any

  constructor(
    private adapter: DateAdapter<any>,
    private mercadoProdutoService: MercadoProdutoService,
    private estadoService: EstadoService,
    private cidadeService: CidadeService,
    private bairroService: BairroService,
    private mercadoLocalidadeService: MercadoLocalidadeService,
    private usuarioService: UsuarioService,
    private categoriaService: CategoriaService
  ) {


    this.formLocalidade = new FormGroup({
      estado: new FormControl({ value: '' }, [Validators.required]),
      cidade: new FormControl({ value: '' }, [Validators.required]),
      bairro: new FormControl({ value: '' }, [Validators.required]),
      dataEntrada: new FormControl({ value: '' }, [Validators.required])
    });
  }


  getKeys(map) {
    return Array.from(map.keys());
  }
  ngOnInit() {

    this.getCategorias();

    //Data
    this.adapter.setLocale('Pt');
    if (this.minDate.getDay() === 2 || this.minDate.getDay() === 5) {
      this.minDate.setDate(this.minDate.getDate() + 1)
    }
    this.maxDate.setDate(this.maxDate.getDate() + 10);

    //pegar id do mercado 
    this.idMercado = this.usuarioService.getUsuarioLogged().mercado.idMercado
    this.temProduto = false;

    this.getEstados();

    //localStorage Alcance
    if (this.mercadoLocalidadeService.getLocaAlcance()) {
      this.alcance = this.mercadoLocalidadeService.getLocaAlcance();

      this.getCidadesPorEstado(this.alcance.bairro.cidade.estado.idEstado)
      this.getBairrosPorCidade(this.alcance.bairro.cidade.idCidade)

      this.formLocalidade.get('estado').setValue(this.alcance.bairro.cidade.estado.idEstado);
      this.formLocalidade.get('cidade').setValue(this.alcance.bairro.cidade.idCidade);
      this.formLocalidade.get('bairro').setValue(this.alcance.bairro.idBairro);
      this.formLocalidade.get('dataEntrada').setValue(new Date(this.alcance.dataEntrada).toISOString());

      console.log(this.alcance.dataEntrada)
    }
  }

  /////////////////////////barra de data superior///////////////////
  getEstados() {
    this.estadoService.getEstadosPorMercado().subscribe(data => {
      this.listaEstados = data.json();
    }, erro => {
      console.error(erro.json());
    })
  }

  getCidadesPorEstado(idEstado: number) {
    this.cidadeService.getCidadePorEstadoMercado(idEstado).subscribe(data => {
      this.listaCidades = data.json();
    }, erro => {
      console.error(erro.json());
    });
  }

  getBairrosPorCidade(idCidade: number) {
    this.bairroService.getBairrosPorCidadeMercado(idCidade).subscribe(data => {
      this.listaBairros = data.json();
    }, erro => {
      console.error(erro.json());
    });
  }

  atualizaCidadeSelect(estado: Estado) {
    this.getCidadesPorEstado(estado.idEstado);
  }

  atualizaBairroSelect(cidade: Cidade) {
    this.getBairrosPorCidade(cidade.idCidade);
  }

  getDataEntrada(event: MatDatepickerInputEvent<Date>) {
    this.formLocalidade.get('dataEntrada').setValue(new Date(event.value).toISOString());
  }

  myFilter = (d: Date): boolean => {
    let dia = new Date().getDate();
    const day = d.getDay();
    // Só deixa selecionar terças e quintas
    return day === 2 || day === 5;
  }
  ///////////////////////// Fim barra de data superior///////////////////



  pesquisarMercadoProdutos() {
    this.temProduto = false;
    this.mercadoprodutos = [];
    this.listaCategorias = [];

    this.dtEntrada = this.formLocalidade.get('dataEntrada').value.split('T')[0];
    this.idBairro = this.formLocalidade.get('bairro').value;

    this.localStorageAlcanceEDataEntrada = { bairro: this.listaBairros[0], dataEntrada: this.formLocalidade.get('dataEntrada').value }
    this.mercadoLocalidadeService.setLocalAlcance(this.localStorageAlcanceEDataEntrada);



    this.mercadoLocalidadeService.getMercadoLocalidadePorMercadoEBairro(this.idMercado, this.idBairro)
      .subscribe(data => {
        this.localidadeAtual = data.json()[0]
        console.log(data.json())
        this.localidadeAtual.mercadoServicos.forEach(ms => {
          if (ms.pacoteServico.idPacoteServico === 7 || ms.pacoteServico.idPacoteServico === 8 
            || ms.pacoteServico.idPacoteServico === 9) {
            this.qtdProdutosPacote = Number(ms.pacoteServico.descricao)
          }
          if (ms.pacoteServico.idPacoteServico === 10 || ms.pacoteServico.idPacoteServico === 11 || 
            ms.pacoteServico.idPacoteServico === 12 || ms.pacoteServico.idPacoteServico === 13) {
            this.qtdBoostPacote = Number(ms.pacoteServico.descricao)
          }
        });
      },
        erro => console.error(erro.json()));

    this.getMercadoProdutosPorBairroEDtEntrata();
    this.getCategorias();

  }

  atualizaProduto(salvo) {
    if (salvo) {
      this.pesquisarMercadoProdutos();
      this.getCategorias()
      this.temProduto = true;
    }
  }

  aoRemover(produtoRemovida) {
    this.pesquisarMercadoProdutos();
    this.temProduto = true;
    /* this.mercadoprodutos = this.mercadoprodutos.filter(produto => produto !== produtoRemovida);
    this.produtosTotal = this.mercadoprodutos.length; */
  }

  adicionarProdutoForm() {
    if (this.categoriaEscolhida) {
      this.mercadoprodutos.unshift(new MercadoProduto());
      console.log(this.produtosTotal)
      if(this.produtosTotal === 0){
        this.produtosTotal = this.mercadoprodutos.length
      }else{
        this.produtosTotal = this.produtosTotal + 1
      }
      
    } else {
      swal('Categoria', `Selecione uma categoria!`, "warning")
    }

  }

  atualizaCategoriaSelect(categoria) {
    this.temProduto = true;
    this.categoriaEscolhida = categoria
    this.getMercadoProdutosPorBairroEDtEntrata()
  }

  getCategorias() {
    this.categoriaService.getCategorias()
      .subscribe((data: any) => {
        data.json().map(categoria => {
          this.totalPorCategoriasMap.set(categoria, 0)
        });
      }, error => console.log(error));
  }


  getMercadoProdutosPorBairroEDtEntrata() {

    //serviço que filtra a dtEntrada para buscar os produtos do mercado localidade 
    this.mercadoProdutoService.getBuscarMercadoProdutosPorBairroEDtEntrada(this.idBairro, this.dtEntrada)
      .subscribe(resp => {
        this.mercadoprodutos = resp.json();
        this.produtosTotal = this.mercadoprodutos.length
        this.totalPorCategoria()
      }, erro => { },
        () => {
          if (this.mercadoprodutos.length !== 0 && this.categoriaEscolhida) {
            this.enviarProdutosCadastradosFiltrados(this.mercadoprodutos)
          }
        })
    

  }

  private enviarProdutosCadastradosFiltrados(produtos: MercadoProduto[]) {
    let filtroProdutos: MercadoProduto[] = [];

    this.categoriaEscolhida.subcategorias.map((subcategoria: Subcategoria) => {
      let idSubcategoria = subcategoria.idSubcategoria
      produtos.map((prod: MercadoProduto) => {
        if (prod.produto.subcategoria.idSubcategoria === idSubcategoria) {
          filtroProdutos.push(prod)
        }
      })
    })
    this.mercadoprodutos = filtroProdutos;
  }


  totalPorCategoria() {
    let chaves = this.getKeys(this.totalPorCategoriasMap)
    chaves.forEach((categoria: Categoria) => {
      this.totalPorCategoriasMap.set(categoria, 0)
    });
    chaves.forEach((categoria: Categoria) => {
      categoria.subcategorias.map((subcategoria: Subcategoria) => {
        this.mercadoprodutos.forEach(mercadoProduto => {
          if (mercadoProduto.produto.subcategoria.idSubcategoria === subcategoria.idSubcategoria) {
            let tmp = this.totalPorCategoriasMap.get(categoria) + 1;
            this.totalPorCategoriasMap.set(categoria, tmp)
          }
         
        });
      });

    })
    this.boostTotal=0;
    this.mercadoprodutos.forEach(mercadoProduto => {
      if(mercadoProduto.fdestaque)
      this.boostTotal=this.boostTotal+1;
    });

    console.log(this.boostTotal)
    console.log(this.qtdBoostPacote)
    this.qntBoostRestante = this.qtdBoostPacote - this.boostTotal;
    console.log(this.qntBoostRestante)
  }

  qntProdutosRestante() {
    return this.qtdProdutosPacote - this.produtosTotal;
  }

  getqntBoostRestante() {
    return this.qtdBoostPacote - this.boostTotal;
  }

}
