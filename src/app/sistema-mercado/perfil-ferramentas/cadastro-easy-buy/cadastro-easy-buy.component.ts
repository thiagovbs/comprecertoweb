import { Component, OnInit } from '@angular/core';
import { MercadoService } from '../../../services/mercado.service';
import { MatTabChangeEvent } from '@angular/material';
import { Mercado } from '../../../models/mercado';
import { AuthenticationService } from '../../../services/authentication.service';



@Component({
  selector: 'app-cadastro-easy-buy',
  templateUrl: './cadastro-easy-buy.component.html',
  styleUrls: ['./cadastro-easy-buy.component.css']
})
export class CadastroEasyBuyComponent implements OnInit {

  atual: number;
  frete: string;
  entrega: string;
  mercadoAtual: Mercado =new Mercado();;
 

 


  constructor(private mercadoService: MercadoService,
              private authService: AuthenticationService) {    
    
    
  }


  ngOnInit() {
    const idMercado = this.authService.getUsuarioLoggedToken().user.mercado.idMercado

     this.mercadoService.getMercadoPorId(idMercado).subscribe(data => {
      this.mercadoAtual = data.json();
      console.log(this.mercadoAtual)
         
        })      
    , error => console.log(error);
    
  }

  btnSalvar(){
    console.log(this.atual)
    if(this.frete ==="sim"){
        this.mercadoAtual.mercadoLocalidades[this.atual].frete=true;
      }else{
        this.mercadoAtual.mercadoLocalidades[this.atual].frete=false;
      }



  this.mercadoService.putMercado(this.mercadoAtual).subscribe(data => {
    console.log(data.json());
  }, error => {
    console.error(error.json());
    
  });
 
  } 

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    this.atual =tabChangeEvent.index;
    console.log(this.atual)
  }

  
  }


  


