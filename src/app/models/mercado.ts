import { MercadoLocalidade } from "./mercado-localidade";

export class Mercado {

    idMercado: number;
    razaoSocial: string;
    nomeFantasia: string;
    imagemUrl:string
    cnpj: number;
    telefone: string;
    email: string;
    fativo: boolean;

    mercadoLocalidades: MercadoLocalidade[] = [];
}