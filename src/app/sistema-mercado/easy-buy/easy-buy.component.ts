import { Component, OnInit, ViewChild, ElementRef, Inject, HostListener } from '@angular/core';
import { MercadoService } from '../../services/mercado.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MercadoLocalidade } from '../../models/mercado-localidade';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/pedido';
import { Entrega } from '../../models/entrega';
import { Pagamento } from '../../models/pagamento';
import { Status } from '../../models/status';
import { Substituicao } from '../../models/substituicao';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatPaginator } from '@angular/material';
import { EasyBuyDialog } from './modal/easy-buy-dialog';
import { Subject, timer, Subscription, Observable } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';





@Component({
  selector: 'app-easy-buy',
  templateUrl: './easy-buy.component.html',
  styleUrls: ['./easy-buy.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})



export class EasyBuyComponent implements OnInit {

  formLocalidade: FormGroup;
  entregaEnum = Entrega;
  pagamentoEnum = Pagamento;
  statusEnum = Status;
  substituicaoEnum = Substituicao;

  timerSubscription: Subscription;
  unsubscribe$: Subject<void> = new Subject();
  endTime = 1;

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  listaMercadoLocalidade: MercadoLocalidade[] = [];
  idMercadoLocalidade: number;
  mercadoLocalidade: MercadoLocalidade;
  listaPedidos: Pedido[] = [];
  valorFrete: number = 0;
  valorMinimoFrete: number = 0;
  finalizados: boolean;

  columnsToDisplay = ['idPedido', 'entrega', 'status', 'usuario.nome', 'dtCriacao'];
  dataSource = new MatTableDataSource();

  index: number;
  id: number;
  expandedElement: Pedido;

  idPedidoFilter = new FormControl('');
  entregaFilter = new FormControl('');
  statusFilter = new FormControl('');
  clienteFilter = new FormControl('');
  dtCriacaoFilter = new FormControl('');
  filterValues = {
    nome: '',
    idPedido: '',
    status: '',
    entrega: '',
    dtCriacao: ''
  };
  subscription: any;



  constructor(private mercadoService: MercadoService,
    private pedidoService: PedidoService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog) {


    this.formLocalidade = this.formBuilder.group({
      filial: [{ value: '' }, [Validators.required]],
      ativar: [false]
    });


  }

  @HostListener('document:keyup', ['$event'])
  @HostListener('document:click', ['$event'])
  @HostListener('document:wheel', ['$event'])
  resetTimer() {
    this.timerSubscription.unsubscribe();
    this.startTimer();
  }


  ngOnInit() {


    this.mercadoService.getMercadoLocalidade()

    this.mercadoService.getMercadoLocalidade().subscribe(data => {
      console.log(data.json())
      this.listaMercadoLocalidade = data.json();
    }, error => {
      console.error(error.json());
    });

    this.idPedidoFilter.valueChanges
      .subscribe(
        idPedido => {
          this.filterValues.idPedido = idPedido;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.entregaFilter.valueChanges
      .subscribe(
        entrega => {
          this.filterValues.entrega = entrega;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.clienteFilter.valueChanges
      .subscribe(
        nome => {
          this.filterValues.nome = nome;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.statusFilter.valueChanges
      .subscribe(
        status => {
          this.filterValues.status = status;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.dtCriacaoFilter.valueChanges
      .subscribe(
        dtCriacao => {
          console.log(dtCriacao)
          console.log(JSON.stringify(this.filterValues))
          this.filterValues.dtCriacao = dtCriacao;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.startTimer();


  }




  pesquisarPedidosML() {
    this.idMercadoLocalidade = this.formLocalidade.get('filial').value;
    this.mercadoLocalidade = this.listaMercadoLocalidade.find(x => x.idMercadoLocalidade == this.idMercadoLocalidade);

    this.valorFrete = this.mercadoLocalidade.valorFrete;
    this.valorMinimoFrete = this.mercadoLocalidade.valorMinimo;

    this.listaPedidos = [];
    this.pedidoService.getPedidos(this.idMercadoLocalidade).subscribe(data => {
      this.listaPedidos = data.json();
      //console.log(data.json());
      this.dataSource = new MatTableDataSource(data.json());
     
      this.dataSource.filterPredicate = this.tableFilter();

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort; this.dataSource.sort = this.sort;

    }, error => {
      console.error(error.json());
    });
  }

  tableFilter(): (data: Pedido, filter: string) => boolean {
    
    let filterFunction = function (data, filter): boolean {
      let entregaEnum2 = Entrega;
      let statusEnum2 = Status;
      let searchTerms = JSON.parse(filter);
      
       let dataPedido: String =new Date(data.dtCriacao).getDate()+ "/"+
       (new Date(data.dtCriacao).getMonth()+1)+"/"+
       new Date(data.dtCriacao).getFullYear();
      
      return data.usuario.nome.toLowerCase().indexOf(searchTerms.nome) !== -1
        && data.idPedido.toString().toLowerCase().indexOf(searchTerms.idPedido) !== -1
        && entregaEnum2[data.entrega].toLowerCase().indexOf(searchTerms.entrega) !== -1
        && statusEnum2[data.status].toLowerCase().indexOf(searchTerms.status) !== -1
        && dataPedido.toLowerCase().indexOf(searchTerms.dtCriacao) !== -1;
    }
    return filterFunction;
  }



  openDialog(pedido: Pedido) {
    const dialogRef = this.dialog.open(EasyBuyDialog, {

      data: { pedido: pedido, valorFrete: this.valorFrete, valorMinimoFrete: this.valorMinimoFrete },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.pesquisarPedidosML();
    });

  }





  // end time in minutes   
  startTimer(endTime: number = this.endTime) {
    const interval = 1000;
    const duration = endTime * 60;
    this.timerSubscription = timer(0, interval).pipe(
      take(duration)
    ).subscribe(value =>
      function render(){},
      err => { },
      () => {        
        if (this.mercadoLocalidade != undefined) {          
          this.pesquisarPedidosML();
        }
        this.resetTimer();
      }
    )
  }

 

 



}

















