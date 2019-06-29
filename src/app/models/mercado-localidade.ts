import { Bairro } from './bairro';
import { MercadoServico } from "./mercado-servico";
import { PacoteServico } from './pacote-servico';
import { Entrega } from './entrega';

export class MercadoLocalidade {
    idMercado: number;

    idMercadoLocalidade: number;
    googlemapsLinks: string;

    mercadoServicos: MercadoServico[] = [];
    bairro: Bairro = new Bairro();

    servicosTemp?: any[] = [];
    googlemapsLinksTemp?: any[] = [];

    entrega: Entrega;
    frete: boolean;
    
    //pacoteServicos?:any = []
}