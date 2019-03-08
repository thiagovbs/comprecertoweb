import { Pais } from "./pais";

export class Estado {

    idEstado: number;
    nome: string;
    sigla: string;

    pais: Pais = new Pais();
}