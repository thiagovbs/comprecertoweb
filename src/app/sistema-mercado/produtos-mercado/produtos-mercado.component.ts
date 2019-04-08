import { Component, OnInit } from '@angular/core';
import { MercadoProduto } from '../../models/mercado-produto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MercadoService } from '../../services/mercado.service';
import { MercadoLocalidade } from '../../models/mercado-localidade';
import { MercadoProdutoService } from '../../services/mercado-produto.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

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
  dtEntrada:number;
  minDate = new Date();

  constructor(private formBuilder: FormBuilder, 
              private mercadoService: MercadoService,
              private mercadoProdutoService:MercadoProdutoService) {
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

    this.mercadoProdutoService.getBuscarMercadoProdutos().subscribe(resp=>{
      console.log(resp.json());
    })

  }

  adicionarProdutoForm() {
    this.mercadosprodutos.unshift(new MercadoProduto());
  }

  atualizaProduto(salvo) {
    if (salvo) {
      console.log(salvo)
      //this.getProdutos();
    }
  }

  btnSalvarLocalidade() {
    this.localidadeAtual = this.formLocalidade.get('mercadoLocalidade').value;
    
    if (this.localidadeAtual.bairro === undefined){  
      this.localidadeAtual = undefined;    
    }
  }

  
  getDataEntrada(event: MatDatepickerInputEvent<Date>) {
    this.dtEntrada = new Date(event.value).getTime();
  }
  
  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Só deixa selecionar terças e quintas
    return day === 2 || day === 5;
  };
}
