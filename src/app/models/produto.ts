import { Subcategoria } from "./subcategoria";
import { UnidadeMedida } from "./unidade-medida";

export class Produto {

    idProduto: number;
    caracteristica: string;
    imagemUrl: string;
    marca: string;
    nome: string;
    quantidade: number;
    subcategoria: Subcategoria = new Subcategoria();
    unidadeMedida: UnidadeMedida = new UnidadeMedida();
}