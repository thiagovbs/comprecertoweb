import { UnidadeMedida } from './unidade-medida';
import { Subcategoria } from './subcategoria';

export class Categoria {

    idCategoria: number;
    fativo: boolean;
    nome: string;
    unidadesMedida: UnidadeMedida[] = [];
    subcategorias: Subcategoria[] = [];
    image?: string;

}