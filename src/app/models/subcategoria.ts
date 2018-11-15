import { Categoria } from "./categoria";

export class Subcategoria {

    idSubcategoria: number;
    fAtivo: boolean;
    nome: string;
    categoria: Categoria = new Categoria();
}