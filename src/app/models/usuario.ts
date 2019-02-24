import { Permissao } from './permissao';
import { Sexo } from './sexo';

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
}