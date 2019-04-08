import { MercadoLocalidade } from "./mercado-localidade";
import { Produto } from "./produto";


export class MercadoProduto {
    idMercadoProduto: number;
    dtEntrada:number;
    fAtivo:boolean;
    fDestaque:boolean;
    fSuperDestaque:boolean;
    observacao:string;
    preco:number;
    mercadoLocalidade:MercadoLocalidade = new MercadoLocalidade();
    produto:Produto = new Produto();

}