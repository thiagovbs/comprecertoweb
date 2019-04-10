import { MercadoLocalidade } from "./mercado-localidade";
import { Produto } from "./produto";


export class MercadoProduto {
    idMercadoProduto: number;
    dtEntrada:Date;
    fAtivo:boolean;
    fDestaque:boolean;
    fSuperDestaque:boolean;
    observacao:string;
    preco:number;


}