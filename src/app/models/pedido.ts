import { Usuario } from "./usuario";
import { MercadoLocalidade } from "./mercado-localidade";
import { PedidoProduto } from "./pedido-produto";
import { Pagamento } from "./pagamento";
import { Status } from "./status";
import { Substituicao } from "./substituicao";


export class Pedido {

    idPedido: number;
    entrega?: string;
    status?: Status;
    pagamento?: Pagamento;
    dtCriacao?: Date;
    dtAlteracao?: Date;
    valorFrete: number;
    troco: number;
    usuario: Usuario;
    substituicao: Substituicao
    telefone: string;
    celular: string;
    endereco: string;
    dataHorarioRetirada: Date;
    pedidoProdutos: PedidoProduto[] = [];  
    mercadoLocalidade: MercadoLocalidade
    
}