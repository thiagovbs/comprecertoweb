import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Faq } from '../../../models/faq';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FaqService } from '../../../services/faq.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-faq-form',
  templateUrl: './faq-form.component.html',
  styleUrls: ['./faq-form.component.css']
})
export class FaqFormComponent implements OnInit {

  @Input('faq')
  faq: Faq = new Faq();
  plataformas: any[] = [{ id: 'APP', value: 'App' }, { id: 'SISTEMA', value: 'Sistema' }]

  @Output("removerFaq")
  faqRemovida = new EventEmitter();

  @Output("atualizaFaq")
  atualizaFaq = new EventEmitter();

  formulario: FormGroup;
  hasEdit: boolean = true;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  constructor(private formBuilder: FormBuilder, private faqService: FaqService) {

    this.formulario = this.formBuilder.group({
      fativo: ['', [Validators.required]],
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      descricao: ['', [Validators.required, Validators.maxLength(255)]],
      plataforma: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    if (this.faq.idFaq) {
      this.formulario.disable();
      this.hasEdit = false;
    }
  }

  cancelar() {
    if (this.faq.idFaq) {
      this.formulario.disable();
      this.hasEdit = false
    } else {
      this.faqRemovida.emit(this.faq);
    }
  }

  salvar() {
    if (this.formulario.valid) {
      if (this.faq.idFaq) {
        this.faqService.putFaq(this.faq).subscribe(data => {
          this.atualizaFaq.emit(true);
        }, error => {
          console.log(error.json());
        }, () => {
          this.formulario.disable();
          this.hasEdit = false;
          swal('Atualização', `A faq foi atualizada!`, "success")
        })
      } else {
        this.faqService.postFaq(this.faq).subscribe(data => {
          this.atualizaFaq.emit(true);
        }, error => {
          console.log(error.json());
        }, () => {
          this.formulario.disable();
          this.hasEdit = false;
          swal('Inclusão', `A faq foi salva!`, "success")
        })
      }
    }
  }

  excluir() {
    swal({
      title: 'Exclusão de Faq',
      text: `Deseja excluir a faq?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.faqService.deleteFaq(this.faq.idFaq).subscribe(data => {
        }, error => {
          console.log(error.json())
        }, () => {
          this.atualizaFaq.emit(true);
          swal('Exclusão', 'A faq foi deletada!', "success")
        })
      }
    })
  }
}
