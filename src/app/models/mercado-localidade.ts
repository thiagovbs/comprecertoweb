import { Bairro } from './bairro';
import { MercadoServico } from "./mercado-servico";
import { Time } from '@angular/common';

export class MercadoLocalidade {
    idMercado?: number;
    idMercadoLocalidade: number;
    googlemapsLinks: string;
    mercadoServicos: MercadoServico[] = [];
    bairro: Bairro = new Bairro();
    servicosTemp?: any[] = [];
    googlemapsLinksTemp?: any[] = [];
    entrega?: string;
    frete?: boolean;
    valorMinimo?:number;
    valorFrete?:number;
    horarioMaximo?:Time;
    horarioMaximoEntrega?:Time;
    telefone?:string;
    endereco?:string;
    rua?:string;
    numero?:string;
    complemento?:string;
    
    //pacoteServicos?:any = []
}
