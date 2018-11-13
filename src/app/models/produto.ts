import { Subcategoria } from "./subcategoria";

export class Produto {

    idProduto: number;
    caracteristica: string;
    imagem: string;
    marca: string;
    nome: string;
    quantidade: number;
    subcategoria: Subcategoria;
}