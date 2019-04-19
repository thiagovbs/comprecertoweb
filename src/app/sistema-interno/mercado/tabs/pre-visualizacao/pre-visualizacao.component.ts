import { Component, OnInit, Inject } from '@angular/core';
import { MercadoComponent } from '../../mercado.component';
import { MercadoLocalidade } from '../../../../models/mercado-localidade';
import { MercadoService } from '../../../../services/mercado.service';

import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Mercado } from '../../../../models/mercado';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-pre-visualizacao',
  templateUrl: './pre-visualizacao.component.html',
  styleUrls: ['./pre-visualizacao.component.css']
})
export class PreVisualizacaoComponent implements OnInit {


  formulario: FormGroup;

  //upload file
  imageChangedEvent: File = null;
  croppedImage: any = '';
  mercado: Mercado
  change: boolean =true;
  myImage:string;
  
  constructor(@Inject(MercadoComponent) private mercadoComponent: MercadoComponent,
    private mercadoService: MercadoService,
    private formBuilder: FormBuilder) {


  }

  ngOnInit() {
    if(this.mercadoComponent.mercado.idMercado){
      this.formulario = this.formBuilder.group({
        imagem: ['']
      });
      console.log(this.mercadoComponent.mercado.imagemUrl)
      this.myImage = this.mercadoComponent.mercado.imagemUrl;
    }else{
      this.formulario = this.formBuilder.group({
        imagem: ['', [Validators.required]]
      });
    }
    
  }

  getValorTotal() {
    return this.mercadoComponent.mercado.mercadoLocalidades.map(localidade => this.getValorRegional(localidade)).reduce((total, valor) => total += valor);
  }

  getValorRegional(localidade: MercadoLocalidade) {
    return localidade.mercadoServicos.map(servico => (servico.pacoteServico.valor - servico.pacoteServico.acrescimo) - servico.pacoteServico.desconto).reduce((total, valor) => total += valor);
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;  
    this.change = false;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    
    //pegando a url da imagem para adicionar no imagem model
    this.mercadoService.getImageUrl(this.formulario.value.imagem);
    //pego a imagem croppada para adicionar no serviço do S3
    this.mercadoService.getCroppedImageFile(this.croppedImage);
  }

}
