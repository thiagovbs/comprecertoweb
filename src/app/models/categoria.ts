import { UnidadeMedida } from './unidade-medida';

export class Categoria {

    idCategoria: number;
    fativo: boolean;
    nome: string;
    unidadesMedida: UnidadeMedida[] = [];
    // subcategorias: Subcategoria[] = [];

}