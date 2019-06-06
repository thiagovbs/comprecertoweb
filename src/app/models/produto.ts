import { Subcategoria } from "./subcategoria";
import { UnidadeMedida } from "./unidade-medida";
import { Categoria } from "./categoria";

export class Produto {

    idProduto: number;
    caracteristica: string;
    imagemUrl: string;
    marca: string;
    nome: string;
    quantidade: number;
    imageBase64:any
    subcategoria: Subcategoria = new Subcategoria();
    unidadeMedida: UnidadeMedida = new UnidadeMedida();
    categoria: Categoria = new Categoria();
}