import { Component, OnInit } from '@angular/core';
import { MercadoProduto } from '../../models/mercado-produto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-produtos-mercado',
  templateUrl: './produtos-mercado.component.html',
  styleUrls: ['./produtos-mercado.component.css']
})
export class ProdutosMercadoComponent implements OnInit {

  mercadosprodutos: MercadoProduto[] = [];
  formLocalidade: FormGroup;
  localidades:Array<string>= ["Tijuca", "Copacabana","Ipanema"]
  localidadeAtual:string;

  constructor(private formBuilder: FormBuilder) {
    this.formLocalidade = this.formBuilder.group({
      mercadoLocalidade: [{ value: '' }, [Validators.required]]
    });
   }


  ngOnInit() {
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

  btnSalvarLocalidade(){
    console.log("salvo")
  }

  getLocalidade(localidade){
    this.localidadeAtual = localidade
  }
}
