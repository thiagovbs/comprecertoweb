import { Component, Inject } from "@angular/core";
import { Entrega } from "../../../models/entrega";
import { Pagamento } from "../../../models/pagamento";
import { Status } from "../../../models/status";
import { Substituicao } from "../../../models/substituicao";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Pedido } from "../../../models/pedido";
import { PedidoProduto } from "../../../models/pedido-produto";
import { PedidoService } from "../../../services/pedido.service";
import swal from "sweetalert2";
import { StatusEntrega } from "../../../models/status-entrega";
import { StatusRetirada } from "../../../models/status-retirada";

@Component({
  selector: 'easy-buy-dialog',
  templateUrl: 'easy-buy-dialog.html',
})
export class EasyBuyDialog {

  entregaEnum = Entrega;
  pagamentoEnum = Pagamento;
  statusEnum = Status;
  statusEntrega = StatusEntrega;
  statusRetirada = StatusRetirada;
  substituicaoEnum = Substituicao;
  pedido: Pedido;
  valorFrete: number = 0;
  valorMinimoFrete: number = 0;
  enumStatus: string[] = Object.keys(this.statusEnum)
  enumStatusEntrega: string[] = Object.keys(this.statusEntrega)
  enumStatusRetirada: string[] = Object.keys(this.statusRetirada)
  loading: boolean;

  constructor(
    public dialogRef: MatDialogRef<EasyBuyDialog>,
    @Inject(MAT_DIALOG_DATA) private data: { pedido: Pedido, valorFrete: number, valorMinimoFrete: number }, private pedidoService: PedidoService, ) { }


  public ngOnInit() {
    //set custom data from parent component
    //console.log(this.data.pedido)
    this.pedido = this.data.pedido;
    this.valorFrete = this.data.valorFrete;
    this.valorMinimoFrete = this.data.valorMinimoFrete;

    this.filteredStatus()
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


  valorTotalPedido(pedidoProdutos: PedidoProduto[]) {
    let total = 0;
    pedidoProdutos.forEach(element => {
      total = total + (element.preco * element.quantidade);
    });
    return total;
  }

  valorTotal(pedido: Pedido) {
    let total = 0;
    pedido.pedidoProdutos.forEach(element => {
      total = total + (element.preco * element.quantidade);
    });
    if (total < this.valorMinimoFrete) {
      total = total + this.valorFrete
    }
    return total;
  }

  listaProdutosPedido(pedidoProdutos: PedidoProduto[]) {
    let lista: String[] = [];

    pedidoProdutos.forEach(element => {
      let tmp: string;
      tmp = element.produto.nome.concat(", ", element.produto.marca, ", ", element.produto.caracteristica,
        ", ", String(element.produto.quantidade), " - Quantidade: ", String(element.quantidade), " - Valor Total: ",
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(element.preco * element.quantidade));

      lista.push(tmp);
    });

    return lista
  }

  salvarStatusPedido(pedido: Pedido) {
    this.loading = true;
    console.log(pedido)
    this.pedidoService.putPedido(pedido).subscribe(data => {

      console.log(data.json())
      //this.pesquisarPedidosML();
    }, error => {
     
      console.error(error.json());
      swal('Erro', `Houve algum problema para atualizar o status do pedido número ${pedido.idPedido}`, 'error');
    }, () => {
      this.loading = false;
      this.dialogRef.close();
      swal('Atualização', `Parabéns o pedido número ${pedido.idPedido}, teve o seu status atualizado!`, 'success');

    });

  }



  filteredStatus() {
    let enums: string[] = [];
    enums.push(this.statusEnum.N)
    enums.push(this.statusEnum.L)
    enums.push(this.statusEnum.A)
    enums.push(this.statusEnum.S)
    enums.push(this.statusEnum.F)
    if (this.pedido.entrega === 'R') {
      enums.push(this.statusEnum.R)
    } else {
      enums.push(this.statusEnum.E)
      enums.push(this.statusEnum.T)
    }

    return enums;
  }


}

