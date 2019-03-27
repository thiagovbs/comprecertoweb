import { MercadoLocalidade } from "./mercado-localidade";
import { Produto } from "./produto";


export class MercadoProduto {
    idMercadoProduto: number;
    dtCriacao:Date;
    dtAlteracao:Date;
    dtEntrada:Date;
    dtValidade:Date;
    fAtivo:boolean;
    fDestaque:boolean;
    fSuperDestaque:boolean;
    observacao:string;
    preco:number;
    MercadoLocalidade:MercadoLocalidade = new MercadoLocalidade();
    produto:Produto = new Produto();

}