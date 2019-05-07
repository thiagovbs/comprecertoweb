import { Permissao } from './permissao';
import { Sexo } from './sexo';
import { Mercado } from './mercado';

export class Usuario {

    dtAlteracao: Date;
    dtCriacao: Date;
    dtNascimento: Date;
    email: string;
    fAtivo: boolean;
    idUsuario: number;
    login: string;
    nome: string;
    permissoes: Permissao[] = [];
    sexo: Sexo;
    mercado: Mercado = new Mercado();
}
