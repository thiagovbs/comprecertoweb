import { Produto } from './produto';

export class MercadoProduto {

    idMercadoProduto: number;
    mercadoLocalidade: any;
    produto: Produto;
    fAtivo: boolean;
    preco: number;
    observacao: string;
    dtEntrada: Date;
    ///////////////////
    fdestaque: boolean;
    fsuperdestaque: boolean;
}
