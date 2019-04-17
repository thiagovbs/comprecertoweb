import { Component, OnInit } from '@angular/core';
import { MercadoProduto } from '../../models/mercado-produto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MercadoService } from '../../services/mercado.service';
import { MercadoLocalidade } from '../../models/mercado-localidade';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material';
import { MercadoProdutoService } from '../../services/mercado-produto.service';

@Component({
  selector: 'app-produtos-mercado',
  templateUrl: './produtos-mercado.component.html',
  styleUrls: ['./produtos-mercado.component.css']
})
export class ProdutosMercadoComponent implements OnInit {

  mercadosprodutos: MercadoProduto[] = [];
  formLocalidade: FormGroup;
  localidadesPorBairro: MercadoLocalidade[]
  localidadeAtual: MercadoLocalidade;
  dtEntrada: any;
  minDate = new Date();

  constructor(private formBuilder: FormBuilder,
    private mercadoService: MercadoService,
    private adapter: DateAdapter<any>,
    private mercadoProdutoService: MercadoProdutoService) {

    this.formLocalidade = this.formBuilder.group({
      mercadoLocalidade: [{ value: '' }, [Validators.required]],
      data_entrada: [{ value: '' }, [Validators.required]]
    });
  }


  ngOnInit() {
    this.mercadoService.getMercadoLocalidade().subscribe(resp => {
      console.log(resp.json())
      this.localidadesPorBairro = resp.json();
    })
  }

  atualizaProduto(salvo) {
    if (salvo) {
      console.log(salvo)
    }
  }
  aoRemover(produtoRemovida) {
    this.mercadosprodutos = this.mercadosprodutos.filter(produto => produto != produtoRemovida);
  }

  adicionarProdutoForm() {
    this.mercadosprodutos.unshift(new MercadoProduto());
  }

  getDataEntrada(event: MatDatepickerInputEvent<Date>) {
    this.adapter.setLocale('Pt');
    this.formLocalidade.get('data_entrada').setValue(new Date(event.value).toISOString())
  }

  btnSalvarLocalidade(evento) {
    this.localidadeAtual = evento.value.mercadoLocalidade;
    //serviço para buscar os produtos do mercado produto
/*     this.mercadoProdutoService.getBuscarMercadoProdutos(evento.value.mercadoLocalidade.idMercadoLocalidade)
      .subscribe(resp => {
        this.mercadosprodutos = resp.json();
      }) */

      this.dtEntrada = evento.value.data_entrada;
      this.dtEntrada = new Date(this.dtEntrada).toISOString();
      console.log(this.dtEntrada)
       this.mercadoProdutoService.getBuscarMercadoProdutosPorData(evento.value.mercadoLocalidade.idMercadoLocalidade,this.dtEntrada)
      .subscribe(resp=>{
        console.log(resp.json())
        this.mercadosprodutos = resp.json()
      },erro=>{
        console.log(erro.json())
      }) 
    //serviço que filtra os produtos do mercado produto por data  
    
    //let splitData = this.dtEntrada.split("T")

/*     this.mercadosprodutos = this.mercadosprodutos.filter(prod => {
      console.log(prod.dtEntrada + "--" + splitData[0])
      return prod.dtEntrada === splitData[0];
    }) */
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Só deixa selecionar terças e quintas
    return day === 2 || day === 5;
  };
}
