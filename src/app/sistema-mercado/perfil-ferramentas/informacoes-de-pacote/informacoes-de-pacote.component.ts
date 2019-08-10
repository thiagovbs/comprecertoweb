import { Component, OnInit } from '@angular/core';
import { MercadoService } from '../../../services/mercado.service';
import { Mercado } from '../../../models/mercado';
import { AuthenticationService } from '../../../services/authentication.service';

import swal from 'sweetalert2';

import { MatDialog } from '@angular/material';
import { MudarSenhaDialog } from './modal/mudar-senha-dialog';
import { PacoteServico } from '../../../models/pacote-servico';


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
    , public dialog: MatDialog) {
  }

  ngOnInit() {

    const idMercado = this.authService.getUsuarioLoggedToken().user.mercado.idMercado
    this.mercadoService.getMercadoPorId(idMercado).subscribe(data => {
      this.mercadoAtual = data.json();
      //console.log(this.mercadoAtual)
      this.myImage = this.mercadoAtual.imagemUrl;
    }), error => console.log(error);

  }

  descricaoServico(pacote: PacoteServico) {

    let tmp: string = ""
    if (pacote.idPacoteServico === 19 || pacote.idPacoteServico === 20 || pacote.idPacoteServico === 21 || pacote.idPacoteServico === 22 ||
      pacote.idPacoteServico === 24 || pacote.idPacoteServico === 25) {
      tmp = " - "+pacote.descricao + "/MÊS"
    } else if (pacote.idPacoteServico === 7 ||
      pacote.idPacoteServico === 8 || pacote.idPacoteServico === 9 || pacote.idPacoteServico === 10 || pacote.idPacoteServico === 11 ||
      pacote.idPacoteServico === 12 || pacote.idPacoteServico === 13) {
      tmp = " - "+pacote.descricao + "/DATA DE ENTRADA"
    }
    return tmp

  }





  tabChanged(tabChangeEvent: any) {

  }






  openDialog() {
    const dialogRef = this.dialog.open(MudarSenhaDialog, {

      data: { pedido: "teste" },
      autoFocus: false,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');

      //this.pesquisarPedidosML();
    });

  }


}





