import { Component, OnInit, ViewChild } from '@angular/core';
import { MercadoService } from '../../../services/mercado.service';
import { Mercado } from '../../../models/mercado';
import { AuthenticationService } from '../../../services/authentication.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { MercadoLocalidade } from '../../../models/mercado-localidade';
import swal from 'sweetalert2';


@Component({
  selector: 'app-cadastro-easy-buy',
  templateUrl: './cadastro-easy-buy.component.html',
  styleUrls: ['./cadastro-easy-buy.component.css']
})
export class CadastroEasyBuyComponent implements OnInit {

  atual: number
  mercadoLocalidadeAtual: MercadoLocalidade;
  frete: string;
  entrega: string = "";
  mercadoAtual: Mercado = new Mercado();
  maskTelefone = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/,/\d/, '-', /\d/, /\d/, /\d/, /\d/]
  loading:boolean;
  isEntrega: boolean = false;
  isFrete: boolean = false;
  verificarIsEntregaIsNull: boolean = false;
  customLoadingTemplate:any;

  cadastroEasyBuyForm: FormGroup = {} as FormGroup;

  constructor(private mercadoService: MercadoService,
    private authService: AuthenticationService,
    private fb: FormBuilder) {
  }

  ngOnInit() {

    const idMercado = this.authService.getUsuarioLoggedToken().user.mercado.idMercado
    this.mercadoService.getMercadoPorId(idMercado).subscribe(data => {
      this.mercadoAtual = data.json();

      for (let i = 0; i <= this.mercadoAtual.mercadoLocalidades.length; i++) {
        this.cadastroEasyBuyForm[i] = new FormGroup({
          tel: new FormControl('', [Validators.required, Validators.pattern(/^\(\d{2}\)\d{5}-\d{4}$/)]),
          vl_minimo: new FormControl({ value: 0, disabled: true }),
          tx_frete: new FormControl({ value: 0, disabled: true }),
          hr_maximo: new FormControl('', [Validators.required]),
          hr_maximo_entrega: new FormControl('', [Validators.required]),

        })
      }

    }), error => console.log(error);

  }

  btnEntregaRetirada(evento) {
    this.entrega = evento;
    this.verificarIsEntregaIsNull = false;
    if (evento === "R") {
      this.entrega = "R"
      this.isEntrega = false;
      this.isFrete = false;

      this.cadastroEasyBuyForm[this.atual].controls['tx_frete'].disable({ onlySelf: true })
      this.cadastroEasyBuyForm[this.atual].controls['vl_minimo'].disable({ onlySelf: true })
      this.cadastroEasyBuyForm[this.atual].controls['hr_maximo_entrega'].disable({ onlySelf: true })
      this.cadastroEasyBuyForm[this.atual].get('vl_minimo').setValue(0);
      this.cadastroEasyBuyForm[this.atual].get('tx_frete').setValue(0);
      this.cadastroEasyBuyForm[this.atual].get('hr_maximo_entrega').setValue(undefined);
      

    } else if (evento === "E") {
      this.entrega = "E"
      this.isEntrega = true
      this.cadastroEasyBuyForm[this.atual].controls['hr_maximo_entrega'].enable({ onlySelf: true })
    } else {
      this.entrega = null
      this.isEntrega = false
    }

  }

  btnFrete(evento) {
    let valor = evento.target.innerText
    if (valor === "Sim" && this.isEntrega) {
      this.isFrete = true
      this.cadastroEasyBuyForm[this.atual].controls['tx_frete'].enable({ onlySelf: true })
      this.cadastroEasyBuyForm[this.atual].controls['vl_minimo'].enable({ onlySelf: true });
      this.cadastroEasyBuyForm[this.atual].controls['hr_maximo_entrega'].enable({ onlySelf: true })

    } else {
      this.isFrete = false
      this.cadastroEasyBuyForm[this.atual].controls['tx_frete'].disable({ onlySelf: true })
      this.cadastroEasyBuyForm[this.atual].controls['vl_minimo'].disable({ onlySelf: true })
      /* this.cadastroEasyBuyForm[this.atual].controls['hr_maximo_entrega'].disable({ onlySelf: true }) */
      this.cadastroEasyBuyForm[this.atual].get('vl_minimo').setValue(0);
      this.cadastroEasyBuyForm[this.atual].get('tx_frete').setValue(0);
     /*  this.cadastroEasyBuyForm[this.atual].get('hr_maximo_entrega').setValue(0); */
    }
  }

  

  tabChanged(tabChangeEvent: any) {    
    this.atual = tabChangeEvent.index;
    this.cadastroEasyBuyForm[this.atual].get('tel').setValue(this.mercadoAtual.mercadoLocalidades[this.atual].telefone);
    this.cadastroEasyBuyForm[this.atual].get('hr_maximo').setValue(this.mercadoAtual.mercadoLocalidades[this.atual].horarioMaximo);
    this.cadastroEasyBuyForm[this.atual].get('hr_maximo_entrega').setValue(this.mercadoAtual.mercadoLocalidades[this.atual].horarioMaximoEntrega);
    if (this.mercadoAtual.mercadoLocalidades[this.atual].entrega === "R") {
      this.entrega = "R"
      this.isEntrega = false
      this.verificarIsEntregaIsNull = false
      this.cadastroEasyBuyForm[this.atual].controls['tx_frete'].disable({ onlySelf: true })
      this.cadastroEasyBuyForm[this.atual].controls['vl_minimo'].disable({ onlySelf: true })
      this.cadastroEasyBuyForm[this.atual].controls['hr_maximo_entrega'].disable({ onlySelf: true })
    } else if (this.mercadoAtual.mercadoLocalidades[this.atual].entrega === "E") {
      this.entrega = "E"
      this.isEntrega = true
      if(this.mercadoAtual.mercadoLocalidades[this.atual].frete){
        this.isFrete=true;
        this.cadastroEasyBuyForm[this.atual].controls['tx_frete'].enable({ onlySelf: true })
      this.cadastroEasyBuyForm[this.atual].controls['vl_minimo'].enable({ onlySelf: true })
      this.cadastroEasyBuyForm[this.atual].controls['hr_maximo_entrega'].enable({ onlySelf: true })
      }     
      this.verificarIsEntregaIsNull = false
    } else {
      this.verificarIsEntregaIsNull = true
      this.entrega = null
      this.isEntrega = false
      this.cadastroEasyBuyForm[this.atual].controls['hr_maximo_entrega'].disable({ onlySelf: true })
    }
  }

  getFormControl() {

  }

  EnviarForm() {
    
    this.loading = true
    let vlMinimo = this.cadastroEasyBuyForm[this.atual].controls['vl_minimo'].value
    let vlFrete = this.cadastroEasyBuyForm[this.atual].controls['tx_frete'].value
    let telefone = this.cadastroEasyBuyForm[this.atual].controls['tel'].value
    let hr_maximo = this.cadastroEasyBuyForm[this.atual].controls['hr_maximo'].value
    let hr_maximo_entrega = this.cadastroEasyBuyForm[this.atual].controls['hr_maximo_entrega'].value

    this.mercadoAtual.mercadoLocalidades[this.atual].valorMinimo = vlMinimo
    this.mercadoAtual.mercadoLocalidades[this.atual].telefone = telefone
    this.mercadoAtual.mercadoLocalidades[this.atual].frete = this.isFrete
    this.mercadoAtual.mercadoLocalidades[this.atual].valorFrete = vlFrete
    this.mercadoAtual.mercadoLocalidades[this.atual].entrega = this.entrega
    this.mercadoAtual.mercadoLocalidades[this.atual].horarioMaximo = hr_maximo
    this.mercadoAtual.mercadoLocalidades[this.atual].horarioMaximoEntrega= hr_maximo_entrega;
    
    if (!this.isFrete) {
      this.mercadoAtual.mercadoLocalidades[this.atual].valorMinimo = null
      this.mercadoAtual.mercadoLocalidades[this.atual].valorFrete = null     
    }
    
    if (telefone === "") {
      swal('Opa', `Campo de telefone em branco!`, 'warning');
    } else if (hr_maximo === "") {
      swal('Opa', `Campo de horário máximo em branco!`, 'warning');
    } else if (this.verificarIsEntregaIsNull) {
      swal('Opa', `Mostre qual o seu tipo de entrega!`, 'warning');
    } else if (!this.cadastroEasyBuyForm[this.atual].valid) {
      swal('Opa', `Tem alguma coisa errada!`, 'warning');
    } else {
      this.mercadoService.putMercado(this.mercadoAtual).subscribe(data => {
        this.loading = false;
        swal('Inclusão', `Parabéns ${this.mercadoAtual.nomeFantasia}, esta localidade agora possui
         serviço de Easy Buy!`, 'success');
      }, error => {
        
        this.loading = false;
        console.error(error.json());
      });
    }

  }

  limparForm() {
    this.isEntrega = false;
    this.verificarIsEntregaIsNull = true;
    this.cadastroEasyBuyForm[this.atual].get('tel').setValue(undefined);
    this.cadastroEasyBuyForm[this.atual].get('vl_minimo').setValue(undefined);
    this.cadastroEasyBuyForm[this.atual].get('tx_frete').setValue(undefined);
    this.cadastroEasyBuyForm[this.atual].get('hr_maximo').setValue(undefined);
    this.cadastroEasyBuyForm[this.atual].get('hr_maximo_entrega').setValue(undefined);

    this.mercadoAtual.mercadoLocalidades[this.atual].telefone = undefined;
    this.mercadoAtual.mercadoLocalidades[this.atual].valorFrete = undefined;
    this.mercadoAtual.mercadoLocalidades[this.atual].valorMinimo = undefined;
    this.mercadoAtual.mercadoLocalidades[this.atual].entrega = undefined;
    this.mercadoAtual.mercadoLocalidades[this.atual].frete = undefined;
    this.mercadoAtual.mercadoLocalidades[this.atual].horarioMaximo = undefined;
    this.mercadoAtual.mercadoLocalidades[this.atual].horarioMaximoEntrega = undefined;

    console.log(this.mercadoAtual)
    this.mercadoService.putMercado(this.mercadoAtual).subscribe(data => {

      swal('Exclusão', `Você excluiu o serviço easy buy desta localidade!`, 'success');

    }, error => {
      console.error(error.json());
    });
  }
}





