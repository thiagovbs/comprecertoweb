import { Bairro } from './bairro';
import { MercadoServico } from "./mercado-servico";
import { PacoteServico } from './pacote-servico';

export class MercadoLocalidade {

    idMercadoLocalidade: number;
    googlemapsLinks: string;

    mercadoServicos: MercadoServico[] = [];
    bairro: Bairro = new Bairro();

    servicosTemp?: any[] = [];
    googlemapsLinksTemp?: any[] = [];
    
    //pacoteServicos?:any = []
}