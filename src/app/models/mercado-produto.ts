import { MercadoLocalidade } from "./mercado-localidade";
import { Produto } from "./produto";


export class MercadoProduto {
    idMercadoProduto: number;
    dtEntrada:Date;
    //dtValidade:Date;
    fAtivo:boolean;
    fDestaque:boolean;
    fSuperDestaque:boolean;
    observacao:string;
    preco:number;
    mercadoLocalidade:MercadoLocalidade = new MercadoLocalidade();
    produto:Produto = new Produto();

}