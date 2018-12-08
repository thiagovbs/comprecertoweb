import { MaskUtil } from './../../../../util/mask.util';
import { Component, OnInit, Inject } from '@angular/core';
import { SupermercadoComponent } from '../../supermercado.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-supermercado',
  templateUrl: './cadastro-supermercado.component.html',
  styleUrls: ['./cadastro-supermercado.component.css']
})
export class CadastroSupermercadoComponent implements OnInit {

  private formulario: FormGroup;
  maskUtil: MaskUtil = new MaskUtil();
  public maskCnpj = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '\/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]
  public maskTelefone = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  constructor(@Inject(SupermercadoComponent) private supermercadoComponent: SupermercadoComponent, private formBuilder: FormBuilder) {
    this.formulario = formBuilder.group({
      razaoSocial: ['', [Validators.required]],
      nomeFantasia: ['', [Validators.required]],
      cnpj: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required]]
    })
  }

  ngOnInit() {
  }

  proximaTab() {
    console.log(this.supermercadoComponent.mercado)
    this.supermercadoComponent.salvar();
  }
}
