import { Component, OnInit } from '@angular/core';
import { MercadoProduto } from '../../models/mercado-produto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MercadoService } from '../../services/mercado.service';
import { MercadoLocalidade } from '../../models/mercado-localidade';
import { MercadoProdutoService } from '../../services/mercado-produto.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material';
import { DateFormatPipe } from './dateFormat.pipe';

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
  dtEntrada:any;
  minDate = new Date();

  constructor(private formBuilder: FormBuilder, 
              private mercadoService: MercadoService,
              private mercadoProdutoService:MercadoProdutoService,
              private adapter: DateAdapter<any>,
              private _dateFormatPipe:DateFormatPipe) {

    this.formLocalidade = this.formBuilder.group({
      mercadoLocalidade: [{ value: '' }, [Validators.required]],
      data_entrada: [{ value: '' }, [Validators.required]]
    });
  }


  ngOnInit() {
    
    this.mercadoService.getMercadoLocalidade().subscribe(resp => {
      console.log(resp.json());
      this.localidadesPorBairro = resp.json();
    })
  }

  atualizaProduto(salvo) {
    if (salvo) {
      console.log(salvo)
    }
  }

  adicionarProdutoForm() {
    this.mercadosprodutos.unshift(new MercadoProduto());
  }

  getLocalidade(localidade:any){
    this.localidadeAtual = localidade;
    this.mercadosprodutos = localidade.mercadoProdutos
  }

    
  getDataEntrada(event: MatDatepickerInputEvent<Date>) {
    
    this.adapter.setLocale('Pt');
    //this.dtEntrada = this._dateFormatPipe.transform(event.value)
    this.dtEntrada = new Date(event.value).toISOString()
    console.log(this.dtEntrada)
    
  }

  btnSalvarLocalidade() {
    
    if (this.localidadeAtual.bairro === undefined){  
      this.localidadeAtual = undefined;    
    }
  }


  
  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Só deixa selecionar terças e quintas
    return day === 2 || day === 5;
  };
}
