import { Component, OnInit } from '@angular/core';
import { MercadoProduto } from '../../models/mercado-produto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MercadoService } from '../../services/mercado.service';
import { MercadoLocalidade } from '../../models/mercado-localidade';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material';

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
              private adapter: DateAdapter<any>) {

    this.formLocalidade = this.formBuilder.group({
      mercadoLocalidade: [{ value: '' }, [Validators.required]],
      data_entrada: [{ value: '' }, [Validators.required]]
    });
  }


  ngOnInit() {
    this.mercadoService.getMercadoLocalidade().subscribe(resp => {
      this.localidadesPorBairro = resp.json();
    })
  }

  atualizaProduto(salvo) {
    if (salvo) {
      console.log(salvo)
    }
  }
  aoRemover(produtoRemovida){
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
    this.mercadosprodutos =  evento.value.mercadoLocalidade.mercadoProdutos;
    this.dtEntrada = evento.value.data_entrada;
    let splitData = this.dtEntrada.split("T")
    console.log(splitData[0]); 
    this.mercadosprodutos = this.mercadosprodutos.filter(prod =>{
      console.log(prod.dtEntrada + "--" +splitData[0]) 
      return prod.dtEntrada === splitData[0];
    })
      
    
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Só deixa selecionar terças e quintas
    return day === 2 || day === 5;
  };
}
