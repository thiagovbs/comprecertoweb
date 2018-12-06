import { Bairro } from './bairro';
import { MercadoServico } from "./mercado-servico";

export class MercadoLocalidade {

    idMercadoLocalidade: number;
    googlemapsLinks: any[] = [];

    mercadoServicos: MercadoServico[] = [];
    bairro: Bairro = new Bairro();
}