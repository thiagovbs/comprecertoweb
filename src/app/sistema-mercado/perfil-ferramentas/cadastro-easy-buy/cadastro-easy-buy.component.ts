import { Component, OnInit } from '@angular/core';
import { MercadoService } from '../../../services/mercado.service';
import { MatTabChangeEvent } from '@angular/material';
import { Mercado } from '../../../models/mercado';
import { AuthenticationService } from '../../../services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Entrega } from '../../../models/entrega';



@Component({
  selector: 'app-cadastro-easy-buy',
  templateUrl: './cadastro-easy-buy.component.html',
  styleUrls: ['./cadastro-easy-buy.component.css']
})
export class CadastroEasyBuyComponent implements OnInit {

  atual: number;
  frete: string;
  entrega: string = "R";
  mercadoAtual: Mercado = new Mercado();
  maskTelefone = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  isEntrega: boolean = false;
  isFrete: boolean = false;

  cadastroEasyBuyForm: FormGroup

  constructor(private mercadoService: MercadoService,
    private authService: AuthenticationService) {

    this.cadastroEasyBuyForm = new FormGroup({
      tel: new FormControl('', [Validators.required, Validators.minLength(3)]),
      vl_minimo: new FormControl({ value: '', disabled: true }, [Validators.required]),
      tx_frete: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(3)]),
      hr_maximo: new FormControl('', [Validators.required])
    })
  }

  ngOnInit() {
    const idMercado = this.authService.getUsuarioLoggedToken().user.mercado.idMercado
    this.mercadoService.getMercadoPorId(idMercado).subscribe(data => {
      this.mercadoAtual = data.json();

    })
      , error => console.log(error);
  }

  btnEntregaRetirada(evento) {
    let valor = evento
    this.entrega = valor;
    valor === "R" ? this.isEntrega = false : this.isEntrega = true;

  }

  btnFrete(evento) {
    let valor = evento.target.innerText

    if (valor === "Sim") {
      this.isFrete = true
      this.cadastroEasyBuyForm.controls['tx_frete'].enable({ onlySelf: true })
      this.cadastroEasyBuyForm.controls['vl_minimo'].enable({ onlySelf: true })
    } else {
      this.isFrete = false
      this.cadastroEasyBuyForm.controls['tx_frete'].disable({onlySelf:true})
      this.cadastroEasyBuyForm.controls['vl_minimo'].disable({ onlySelf: true })
    }
  }


  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    this.atual = tabChangeEvent.index;
  }

  EnviarForm(evento) {
    let entrega:string = ''
    
    if (evento) {
      let vlMinimo = this.cadastroEasyBuyForm.controls['vl_minimo'].value
      let vlFrete = this.cadastroEasyBuyForm.controls['tx_frete'].value
      let telefone = this.cadastroEasyBuyForm.controls['tel'].value

      this.mercadoAtual.mercadoLocalidades[this.atual].telefone = telefone
      this.mercadoAtual.mercadoLocalidades[this.atual].frete = this.isFrete
      this.mercadoAtual.mercadoLocalidades[this.atual].valorMinimo = vlMinimo
      this.mercadoAtual.mercadoLocalidades[this.atual].valorFrete = vlFrete
      this.mercadoAtual.mercadoLocalidades[this.atual].entrega = this.entrega
      
      console.log(this.mercadoAtual)
       this.mercadoService.putMercado(this.mercadoAtual).subscribe(data => {
         console.log(data.json());
       }, error => {
         console.error(error.json());
 
       });
    }
    console.log(evento)
  }
}





