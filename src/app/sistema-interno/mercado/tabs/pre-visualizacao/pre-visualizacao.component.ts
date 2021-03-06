import { Component, OnInit, Inject } from '@angular/core';
import { MercadoComponent } from '../../mercado.component';
import { MercadoLocalidade } from '../../../../models/mercado-localidade';
import { MercadoService } from '../../../../services/mercado.service';

import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Mercado } from '../../../../models/mercado';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PacoteServicosComponent } from '../pacote-servicos/pacote-servicos.component';
import { ServicoService } from '../../../../services/servico.service';

@Component({
  selector: 'app-pre-visualizacao',
  templateUrl: './pre-visualizacao.component.html',
  styleUrls: ['./pre-visualizacao.component.css']
})
export class PreVisualizacaoComponent implements OnInit {

  formulario: FormGroup;
  // upload file
    imageChangedEvent: File = null;
    croppedImage: any = '';
  mercado: Mercado;
  change = true;
  myImage: string;

  localidades:MercadoLocalidade[]= []

  constructor(
    @Inject(MercadoComponent) public mercadoComponent: MercadoComponent,   
    private mercadoService: MercadoService
  ) { }

  ngOnInit() {
    console.log(this.mercadoComponent.mercado.mercadoLocalidades)
    if (this.mercadoComponent.mercado.idMercado) {
      
      this.formulario = new FormGroup({
        imagem: new FormControl('')
      });
      this.myImage = this.mercadoComponent.mercado.imagemUrl;
    } else {
      this.formulario = new FormGroup({
        imagem:new FormControl ('', [Validators.required])
      });
    }
  }

  getValorRegional(localidade: MercadoLocalidade) {    
    let valor = 0;
    localidade.mercadoServicos.map(servico => {
      valor = valor + ((servico.pacoteServico.valor + servico.pacoteServico.acrescimo)
        - servico.pacoteServico.desconto)
    });
    return valor;
  }

  getValorTotal() {
    let valor = 0;
    this.mercadoComponent.mercado.mercadoLocalidades.map(localidade => {
      valor = valor + this.getValorRegional(localidade)
    });
    return valor
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.change = false;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;

    // pegando a url da imagem para adicionar no imagem model
    this.mercadoService.getImageUrl(this.formulario.value.imagem);
    // pego a imagem croppada para adicionar no serviço do S3
    this.mercadoService.getCroppedImageFile(this.croppedImage);
  }

  anteriorTab(){
    this.mercadoComponent.selectedTab = this.mercadoComponent.tabs.filter(tab => tab.key === 'servicos')[0];
  }
 
}
