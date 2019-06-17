import { PacoteServico } from "./pacote-servico";

export class MercadoServico {

    idMercadoServico: number;
    dtInicioServico: Date;
    dtFimServico: Date;
    pacoteServico: PacoteServico;
    pacoteServicos: PacoteServico[];
    pacoteSelecionado: PacoteServico;
    fativo: boolean;

    saldo: number;
}