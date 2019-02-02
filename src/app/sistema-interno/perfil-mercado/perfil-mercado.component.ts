import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Mercado } from '../../models/mercado';
import { MercadoLocalidade } from '../../models/mercado-localidade';
import swal from 'sweetalert2';
import { MercadoService } from '../../services/mercado.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-perfil-mercado',
  templateUrl: './perfil-mercado.component.html',
  styleUrls: ['./perfil-mercado.component.css']
})
export class PerfilMercadoComponent implements OnInit {

  @Input('mercado')
  mercado: Mercado = new Mercado();

  @Output('atualiza')
  atualizaMercado = new EventEmitter();

  constructor(private mercadoService: MercadoService) { }
  myImage:string
  ngOnInit() {
    this.myImage = `${environment.urlS3}/mercado${this.mercado.idMercado}.jpg`;
  }

  getValorRegional(localidade: MercadoLocalidade) {
    return localidade.mercadoServicos.map(servico => 
            (servico.pacoteServico.valor - servico.pacoteServico.acrescimo) - servico.pacoteServico.desconto)
            .reduce((total, valor) => total += valor);
  }

  getValorTotal() {
    return this.mercado.mercadoLocalidades.map(localidade =>
           this.getValorRegional(localidade)).reduce((total, valor) => total += valor);
  }

  desativar() {
    swal({
      title: 'Desativação de mercado',
      text: `Deseja desativar o mercado: ${this.mercado.nomeFantasia}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.mercadoService.deleteMercado(this.mercado.idMercado).subscribe(data => {
        }, error => {
          console.log(error.json())
        }, () => {
          this.atualizaMercado.emit(true);
          swal('Desativação', 'O mercado foi desativado!', "success")
        })
      }
    })
  }

}
