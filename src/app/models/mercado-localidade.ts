import { Bairro } from './bairro';
import { MercadoServico } from "./mercado-servico";

export class MercadoLocalidade {

    idMercadoLocalidade: number;
    googlemapsLinks: string;

    mercadoServicos: MercadoServico[] = [];
    bairro: Bairro = new Bairro();

    servicosTemp?: any[] = [];
    googlemapsLinksTemp?: any[] = [];
}