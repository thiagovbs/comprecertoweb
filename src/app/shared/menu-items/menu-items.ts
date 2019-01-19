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
    state: 'cadastro-unidades-medida',
    name: 'Unidades de Medida',
    type: 'link',
    icon: 'add'
  },
  {
    state: 'cadastro-categorias',
    name: 'Categorias',
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
    state: 'cadastro-mercado',
    name: 'Cadastro de Mercado',
    type: 'link',
    icon: 'add'
  },
  {
    state: 'perfil-mercado',
    name: 'Perfil dos Mercados',
    type: 'link',
    icon: 'add'
  },
  {
    state: 'cadastro-faq',
    name: 'FAQ',
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

@Injectable()
export class MenuItems {

  constructor(private usuarioService: UsuarioService) { }

  getMenuitem(): Menu[] {
    if (this.usuarioService.getUsuarioLogged().permissoes.find(p => p.descricao == 'MERCADO_ADMIN')) {
      return MERCADO_ADMIN_MENU_ITEMS;
    }

    return MENUITEMS;
  }
}
