import { MercadoLocalidade } from "./mercado-localidade";

export class Mercado {

    idMercado: number;
    razaoSocial: string;
    nomeFantasia: string;
    imageBase64:any
    cnpj: number;
    telefone: string;
    email: string;
    fativo: boolean;

    mercadoLocalidades: MercadoLocalidade[] = [];
}