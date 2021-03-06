import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UnidadeMedida } from '../../../models/unidade-medida';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { UnidadeMedidaService } from '../../../services/unidade-medida.service';

@Component({
  selector: 'app-unidades-medida-form',
  templateUrl: './unidades-medida-form.component.html',
  styleUrls: ['./unidades-medida-form.component.css']
})
export class UnidadesMedidaFormComponent implements OnInit {

  loading:boolean
  customLoadingTemplate:any;

  @Input("unidadeMedida")
  unidadeMedida: UnidadeMedida = new UnidadeMedida();

  @Output("removerUnidadeMedida")
  unidadeMedidaRemovida = new EventEmitter();

  @Output("atualizaUnidadeMedida")
  atualizaUnidadeMedida = new EventEmitter();

  formulario: FormGroup;
  hasEdit: boolean = true;

  constructor(private formBuilder: FormBuilder, private unidadeMedidaService: UnidadeMedidaService) {

    this.formulario = this.formBuilder.group({
      fativo: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      sigla: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    if (this.unidadeMedida.idUnidade) {
      this.formulario.disable();
      this.hasEdit = false;
    }
  }

  cancelar() {
    if (this.unidadeMedida.idUnidade) {
      this.formulario.disable();
      this.hasEdit = false
    } else {
      this.unidadeMedidaRemovida.emit(this.unidadeMedida);
    }
  }

  salvar() {
    this.loading = true
    if (this.formulario.valid) {
      if (this.unidadeMedida.idUnidade) {
        this.unidadeMedidaService.putUnidadeMedida(this.unidadeMedida).subscribe(data => {
          this.atualizaUnidadeMedida.emit(true);
          this.loading = false
        }, error => {
          this.loading = false
          console.log(error.json());
        }, () => {
          this.formulario.disable();
          this.hasEdit = false;
          Swal('Atualização', `A unidadeMedida ${this.unidadeMedida.nome} foi atualizada!`, "success")
        })
      } else {
        this.unidadeMedidaService.postUnidadeMedida(this.unidadeMedida).subscribe(data => {
          this.atualizaUnidadeMedida.emit(true);
          this.loading = false
        }, error => {
          this.loading = false
          console.log(error.json());
        }, () => {
          this.formulario.disable();
          this.hasEdit = false;
          Swal('Inclusão', `A unidade medida ${this.unidadeMedida.nome} foi salva!`, "success")
        })
      }
    }
  }

  excluir() {
    this.loading = true
    Swal({
      title: 'Exclusão de unidadeMedida',
      text: `Deseja excluir a unidadeMedida: ${this.unidadeMedida.nome}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.unidadeMedidaService.deleteUnidadeMedida(this.unidadeMedida.idUnidade).subscribe(data => {
          this.loading = false
        }, error => {
          this.loading = false
          console.log(error.json())
        }, () => {
          this.atualizaUnidadeMedida.emit(true);
          Swal('Exclusão', 'A unidadeMedida foi deletada!', "success")
        })
      }
    })
  }
}
