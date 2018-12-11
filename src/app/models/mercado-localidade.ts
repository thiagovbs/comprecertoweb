import { Bairro } from './bairro';
import { MercadoServico } from "./mercado-servico";
import { Servico } from './servico';

export class MercadoLocalidade {

    idMercadoLocalidade: number;
    googlemapsLinks: any[] = [];

    mercadoServicos: MercadoServico[] = [];
    bairro: Bairro = new Bairro();

    servicosTemp?: Servico[] = [];
}