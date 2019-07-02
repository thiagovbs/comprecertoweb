import { Injectable } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

export interface BadgeItem {
  type: string;
  value: string;
}
export interface Saperator {
  name: string;
  type?: string;
}
export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  saperator?: Saperator[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: 'starter',
    name: 'Starter Page',
    type: 'link',
    icon: 'content_copy'
  },
  {
    state: 'material',
    name: 'Material Ui',
    type: 'sub',
    icon: 'bubble_chart',
    badge: [{ type: 'red', value: '17' }],
    children: [
      { state: 'button', name: 'Buttons' },
      { state: 'cards', name: 'Cards' },
      { state: 'grid', name: 'Grid List' },
      { state: 'lists', name: 'Lists' },
      { state: 'menu', name: 'Menu' },
      { state: 'tabs', name: 'Tabs' },
      { state: 'stepper', name: 'Stepper' },
      { state: 'expansion', name: 'Expansion Panel' },
      { state: 'chips', name: 'Chips' },
      { state: 'toolbar', name: 'Toolbar' },
      { state: 'progress-snipper', name: 'Progress snipper' },
      { state: 'progress', name: 'Progress Bar' },
      { state: 'dialog', name: 'Dialog' },
      { state: 'tooltip', name: 'Tooltip' },
      { state: 'snackbar', name: 'Snackbar' },
      { state: 'slider', name: 'Slider' },
      { state: 'slide-toggle', name: 'Slide Toggle' }
    ]
  }
];

const MERCADO_ADMIN_MENU_ITEMS = [
  {
    state: 'analytics',
    name: 'Analytics',
    type: 'link',
    icon: 'add'
  },
  {
    state: 'cadastro-mercado',
    name: 'Cadastro de Cliente',
    type: 'link',
    icon: 'add'
  },
  {
    state: 'perfil-mercado',
    name: 'Histórico de Clientes',
    type: 'link',
    icon: 'add'
  },
  {
    state: 'cadastro-produtos',
    name: 'Produtos',
    type: 'link',
    icon: 'add'
  },
  {
    state: 'cadastro-categorias',
    name: 'Categorias e Sub',
    type: 'link',
    icon: 'add'
  },
  {
    state: 'cadastro-unidades-medida',
    name: 'Unidade de Medida',
    type: 'link',
    icon: 'add'
  },
  {
    state: 'cadastro-faq',
    name: 'Cadastro de FAQ',
    type: 'link',
    icon: 'add'
  },
  {
    state: 'liberacao-push',
    name: 'Liberação de PUSHs',
    type: 'link',
    icon: 'add'
  }
];

const MERCADO_MENU_ITEMS = [

  {
    state: 'analytics-mercado',
    name: 'Analytics',
    type: 'link',
    icon: 'add'
  },
  {
    state: 'produtos-mercado',
    name: 'Cadastrar Produtos',
    type: 'link',
    icon: 'add'
  },
  {
    state: 'perfil-ferramentas',
    name: 'Perfil e Ferramentas',
    type: 'sub',
    icon: 'apps',

    children: [
      {
        state: 'cadastro-easy-buy',
        name: 'Cadastro easy buy'
      }
    ]
  },
  {
    state: 'faqs',
    name: 'Faqs',
    type: 'link',
    icon: 'add'
  }
];

@Injectable()
export class MenuItems {

  constructor(private usuarioService: UsuarioService) { }

  getMenuitem(): Menu[] {
    if (this.usuarioService.getUsuarioLogged()
      && this.usuarioService.getUsuarioLogged().permissoes.find(p => p.descricao === 'MERCADO_ADMIN')) {
      return MERCADO_ADMIN_MENU_ITEMS;
    }
    if (this.usuarioService.getUsuarioLogged()
      && this.usuarioService.getUsuarioLogged().permissoes.find(p => p.descricao === 'MERCADO_OPERADOR')) {
      return MERCADO_MENU_ITEMS;
    }
  }
}
