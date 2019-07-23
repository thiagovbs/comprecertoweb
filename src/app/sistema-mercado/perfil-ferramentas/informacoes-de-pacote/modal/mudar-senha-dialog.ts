import { Component, Inject } from "@angular/core";

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

import swal from "sweetalert2";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsuarioService } from "../../../../services/usuario.service";
import { AuthenticationService } from "../../../../services/authentication.service";

@Component({
  selector: 'mudar-senha-dialog',
  templateUrl: 'mudar-senha-dialog.html',
})
export class MudarSenhaDialog {

  mudarSenhaForm: FormGroup = {} as FormGroup;


  constructor(
    public dialogRef: MatDialogRef<MudarSenhaDialog>, private usuarioService: UsuarioService,
    private authenService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) private data: { pedido: string }) { }


  public ngOnInit() {
    //set custom data from parent component
    //console.log(this.data.pedido)
    this.mudarSenhaForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      newPassword2: new FormControl('', [Validators.required]),

    })

    this.mudarSenhaForm.setValidators(this.checkPasswords);
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  let pass = group.controls.newPassword.value;
  let confirmPass = group.controls.newPassword2.value;

  return pass === confirmPass ? null : { notSame: true }     
}


  onNoClick(): void {
    this.dialogRef.close();
  }


  alterarSenha() {
    let oldPassword = this.mudarSenhaForm.controls['oldPassword'].value
    let newPassword = this.mudarSenhaForm.controls['newPassword'].value

    this.usuarioService.putUsuarioSenhas(newPassword, oldPassword).subscribe(data => {
      //console.log(data.json())
    }, error => {
      console.error(error);
      swal('Erro', `A senha antiga não confere! `, 'error');
    }, () => {
      this.dialogRef.close();
      swal('Atualização', `Parabéns o pedido número , teve o seu status atualizado!`, 'success');
    });

  }


}

