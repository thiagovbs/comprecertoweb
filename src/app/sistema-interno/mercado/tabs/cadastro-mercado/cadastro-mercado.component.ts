import { MaskUtil } from '../../../../util/mask.util';
import { Component, OnInit, Inject } from '@angular/core';
import { MercadoComponent } from '../../mercado.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-mercado',
  templateUrl: './cadastro-mercado.component.html',
  styleUrls: ['./cadastro-mercado.component.css']
})
export class CadastroMercadoComponent implements OnInit {

  private formulario: FormGroup;
  maskUtil: MaskUtil = new MaskUtil();
  public maskCnpj = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '\/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]
  public maskTelefone = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  constructor(@Inject(MercadoComponent) private mercadoComponent: MercadoComponent, private formBuilder: FormBuilder) {
    this.formulario = formBuilder.group({
      razaoSocial: ['', [Validators.required]],
      nomeFantasia: ['', [Validators.required]],
      cnpj: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      senha: ['', [Validators.required]]
    })
  }

  ngOnInit() {
  }

  proximaTab() {
    // console.log(this.mercadoComponent.mercado)
    this.mercadoComponent.selectedTab = this.mercadoComponent.tabs.filter(tab => tab.key === 'localidade-filial')[0];
  }
}
