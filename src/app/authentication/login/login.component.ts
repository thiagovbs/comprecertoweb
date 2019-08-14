import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  loading:boolean;
  customLoadingTemplate:any;
  error = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    this.loading = true
    this.authenticationService.login(this.form.get('username').value, this.form.get('password').value).subscribe(
      (data:any) => {
        this.loading = false
        console.log(data)
        this.authenticationService.armazenarToken(data['access_token']);
        if (!this.usuarioService.hasPermissoes()) {
          console.log('O usuário não possui nenhum permissão');
          return;
        }
        this.error = false;
        if(data.user.permissoes[0].descricao === "MERCADO_OPERADOR"){
          this.router.navigate(['/secure/analytics-mercado']);    
        }else{
          this.router.navigate(['/secure/analytics']);
        }
        
      }, error => {
        this.loading = false
        if (error.status === 400) {
          const responseJson = error.error;

          if (responseJson.error === 'invalid_grant') {
            this.error = true;
             //Swal('Login', 'Usuário ou senha inválida!', 'error');
          }
        }
      }
    );;
  }
}
