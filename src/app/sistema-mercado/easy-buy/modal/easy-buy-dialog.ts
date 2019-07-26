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

@Component({
    selector: 'easy-buy-dialog',
    templateUrl: 'easy-buy-dialog.html',
})
export class EasyBuyDialog {

    entregaEnum = Entrega;
    pagamentoEnum = Pagamento;
    statusEnum = Status;
    substituicaoEnum = Substituicao;
    pedido: Pedido;
    valorFrete: number = 0;
    valorMinimoFrete: number = 0;


    constructor(
        public dialogRef: MatDialogRef<EasyBuyDialog>,
        @Inject(MAT_DIALOG_DATA) private data: { pedido: Pedido, valorFrete:number,valorMinimoFrete:number }, private pedidoService: PedidoService,) { }


    public ngOnInit() {
        //set custom data from parent component
        //console.log(this.data.pedido)
        this.pedido=this.data.pedido;
        this.valorFrete=this.data.valorFrete;
        this.valorMinimoFrete=this.data.valorMinimoFrete;

        console.log(this.pedido.dataHorarioRetirada)
    }


    onNoClick(): void {
        this.dialogRef.close();
    }

    getStatusEnum() {
        return Object.keys(this.statusEnum)
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
        console.log(pedido)
        this.pedidoService.putPedido(pedido).subscribe(data => {
          console.log(data.json())          
          //this.pesquisarPedidosML();
        }, error => {
          console.error(error.json());
          swal('Erro', `Houve algum problema para atualizar o status do pedido número ${pedido.idPedido}`, 'error');
        }, () =>{
            this.dialogRef.close();
            swal('Atualização', `Parabéns o pedido número ${pedido.idPedido}, teve o seu status atualizado!`, 'success');
        });
       
      }

      aprovarPedido(pedido:Pedido){
        let teste: Status = "N" as Status;
        console.log(teste)
        

      }
      recusarPedido(pedido:Pedido){
        pedido.status=this.statusEnum.N
      }

      
}
