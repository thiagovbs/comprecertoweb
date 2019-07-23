import { Component, OnInit } from '@angular/core';
import { MercadoService } from '../../../services/mercado.service';
import { Mercado } from '../../../models/mercado';
import { AuthenticationService } from '../../../services/authentication.service';

import swal from 'sweetalert2';

import { MatDialog } from '@angular/material';
import { MudarSenhaDialog } from './modal/mudar-senha-dialog';


@Component({
  selector: 'app-informacoes-de-pacote',
  templateUrl: './informacoes-de-pacote.component.html',
  styleUrls: ['./informacoes-de-pacote.component.css']
})
export class InformacoesDePacoteComponent implements OnInit {
  myImage: string;
  
  mercadoAtual: Mercado = new Mercado();
  

  constructor(private mercadoService: MercadoService,
    private authService: AuthenticationService
    ,public dialog: MatDialog) {
  }

  ngOnInit() {

    const idMercado = this.authService.getUsuarioLoggedToken().user.mercado.idMercado
    this.mercadoService.getMercadoPorId(idMercado).subscribe(data => {
      this.mercadoAtual = data.json();
      //console.log(this.mercadoAtual)
      this.myImage=this.mercadoAtual.imagemUrl;
    }), error => console.log(error);

  }



 

  

  tabChanged(tabChangeEvent: any) {    
    
  }

 
 

 
 
  openDialog() {
    const dialogRef = this.dialog.open(MudarSenhaDialog, {

      data: { pedido: "teste"},
      autoFocus: false,
       disableClose: true 
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');

      //this.pesquisarPedidosML();
    });

  }


}





