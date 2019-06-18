import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { UsuarioService } from '../../services/usuario.service';


/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: []
})
export class FullComponent implements OnDestroy, AfterViewInit {
  mobileQuery: MediaQueryList;
  minisidebar: boolean;
  sidebarOpened;
  private _mobileQueryListener: () => void;

  user: string

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    private usuarioService: UsuarioService
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.user = this.usuarioService.getUsuarioLogged().nome
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit() {
    
  }
}
