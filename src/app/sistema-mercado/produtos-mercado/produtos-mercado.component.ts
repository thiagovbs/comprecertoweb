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
    private mercadoProdutoService: MercadoProdutoService,
  ) {

    this.formLocalidade = this.formBuilder.group({
      mercadoLocalidade: [{ value: '' }, [Validators.required]],
      data_entrada: [{ value: '' }, [Validators.required]]
    });
  }


  ngOnInit() {
    this.mercadoService.getMercadoLocalidade().subscribe(resp => {
      this.localidadesPorBairro = resp.json();
      console.log(this.localidadesPorBairro)
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
    this.dtEntrada = evento.value.data_entrada;
    //serviço para buscar os produtos do mercado produto
    /*     this.mercadoProdutoService.getBuscarMercadoProdutos(evento.value.mercadoLocalidade.idMercadoLocalidade)
          .subscribe(resp => {
            this.mercadosprodutos = resp.json();
          }) */
    
    let splitData = this.dtEntrada.split("T")
    
    //serviço que filtra a dtEntrada para buscar os produtos do mercado produto 
    this.mercadoProdutoService.getBuscarMercadoProdutosPorData(evento.value.mercadoLocalidade.idMercadoLocalidade, splitData[0])
      .subscribe(resp => {
        this.mercadosprodutos = resp.json()
      }, erro => {
        console.log(erro.json())
      })
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Só deixa selecionar terças e quintas
    return day === 2 || day === 5;
  };
}
