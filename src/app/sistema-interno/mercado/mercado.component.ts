import { MercadoService } from '../../services/mercado.service';
import { Component, OnInit } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Mercado } from '../../models/mercado';

import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { PacoteServico } from '../../models/pacote-servico';
import { ServicoService } from '../../services/servico.service';

@Component({
  selector: 'app-mercado',
  templateUrl: './mercado.component.html',
  styleUrls: ['./mercado.component.css']
})
export class MercadoComponent implements OnInit {

  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: 960px)`);

  public config: PerfectScrollbarConfigInterface = {};
  loading: boolean = false;
  displayMode = 'default';

  tabs: any = [
    {
      key: 'dados',
      nome: '1 - Dados Gerais',
      disabled: false
    },
    {
      key: 'localidade-filial',
      nome: '2 - Localidade',
      disabled: true
    },
    {
      key: 'servicos',
      nome: '3 - Serviços',
      disabled: true
    },
    {
      key: 'finalizacao',
      nome: '4 - Pré visualização',
      disabled: true
    }
  ];
  selectedTab: any;
  messageOpen = false;
  sidePanelOpened = true;

  mercado: Mercado = new Mercado();

  constructor(
    private mercadoService: MercadoService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private servicoService: ServicoService) { }

  ngOnInit() {
    
    this.activeRoute.params.subscribe(params => {
      if (params['idMercado'] !== undefined) {
        this.mercado.idMercado = params['idMercado'];
        this.getMercadoPorId();
        this.tabs.forEach(tab => tab.disabled = false);
      }
    });
    this.selectedTab = this.tabs[0];
  }

  isOver(): boolean {
    return this.mediaMatcher.matches;
  }

  salvar() {
    this.loading = true;
    this.mercado.imageBase64 = this.mercadoService.croppedFile;

    if (this.mercado.idMercado) {
      this.servicoService.localidadesEnvio
      this.mercadoService.putMercado(this.mercado).subscribe(() => {
        // this.atualizaProduto.emit(true);
      }, error => {
        this.loading = false
        Swal('Alteração', `O mercado ${this.mercado.nomeFantasia} não pode ser editado, verifique se está tudo preenchido corretamente!`, 'warning');
      }, () => {
        this.loading = false
        Swal('Atualização', `O mercado ${this.mercado.nomeFantasia} foi atualizado!`, 'success');
        this.router.navigate(['/secure/perfil-mercado'])
      });
    } else {
      this.mercadoService.postMercado(this.mercado).subscribe(() => {

      }, error => {
        this.loading = false
        Swal('Inclusão', `O mercado não pode ser salvo, verifique se está tudo preenchido corretamente!`, 'warning');
      }, () => {
        this.loading = false
        Swal('Inclusão', `O mercado ${this.mercado.nomeFantasia} foi salvo!`, 'success');
        this.router.navigate(['/secure/perfil-mercado'])
      });
    }
  }

  getMercadoPorId() {
    this.mercadoService.getMercadoPorId(this.mercado.idMercado).subscribe(data => {
      this.mercado = data.json();
      
    }, error => {
      console.log(error.json());
    }, () => {
      this.mercado.mercadoLocalidades.forEach(localidade => {
        const localidades = localidade.googlemapsLinks.split(',');
        localidade.googlemapsLinksTemp = localidades.map((loc, index) => ({ id: index, value: loc }));
        
        localidade.servicosTemp.forEach(servicoTemp => {
          
          if (!servicoTemp.pacoteSelecionado || servicoTemp.pacoteSelecionado === null) {
            
            servicoTemp.pacoteSelecionado = new PacoteServico();
          }
        });
      });
    });
  }
}
