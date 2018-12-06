import { Estado } from './estado';

export class Cidade {

    idCidade: number;
    nome: string;

    estado: Estado = new Estado();
}