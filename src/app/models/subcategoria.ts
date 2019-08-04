import { Categoria } from "./categoria";

export class Subcategoria {

    idSubcategoria: number;
    fativo: boolean;
    nome: string;
    categoria?: Categoria = new Categoria();
}