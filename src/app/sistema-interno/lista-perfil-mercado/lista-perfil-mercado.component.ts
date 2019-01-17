import { Component, OnInit } from '@angular/core';
import { MercadoService } from '../../services/mercado.service';
import { Mercado } from '../../models/mercado';

@Component({
  selector: 'app-lista-perfil-mercado',
  templateUrl: './lista-perfil-mercado.component.html',
  styleUrls: ['./lista-perfil-mercado.component.css']
})
export class ListaPerfilMercadoComponent implements OnInit {

  observable: any;

  mercados: Mercado[] = [];

  constructor(private mercadoService: MercadoService) { }

  ngOnInit() {
    this.getMercados();
  }

  getMercados() {
    this.observable = this.mercadoService.getMercados().subscribe(data => {
      console.log(data.json());
      this.mercados = data.json();
    }, error => console.log(error));
  }

}
