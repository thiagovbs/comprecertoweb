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

  public formulario: FormGroup;
  maskUtil: MaskUtil = new MaskUtil();
  public maskCnpj = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '\/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]
  public maskTelefone = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  constructor(@Inject(MercadoComponent) public mercadoComponent: MercadoComponent, private formBuilder: FormBuilder) {
    this.formulario = formBuilder.group({
      razaoSocial: ['', [Validators.required, Validators.maxLength(150)]],
      nomeFantasia: ['', [Validators.required, Validators.maxLength(150)]],
      cnpj: ['', [Validators.required, Validators.pattern(/^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/)]],
      telefone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\)\d{4}-\d{4}$/)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    })
  }

  ngOnInit() {
  }

  proximaTab() {
    // console.log(this.mercadoComponent.mercado)
    this.mercadoComponent.selectedTab = this.mercadoComponent.tabs.filter(tab => tab.key === 'localidade-filial')[0];
    this.mercadoComponent.tabs.find(tab => tab.key === 'localidade-filial').disabled = false;
  }
}
