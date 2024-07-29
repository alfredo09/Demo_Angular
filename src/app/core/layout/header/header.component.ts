import { Component, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrimeModule } from 'src/app/prime.module';
import { MegaMenuItem } from 'primeng/api';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, RouterModule, PrimeModule],
  standalone: true,
})
export class HeaderComponent {
  constructor(private router: Router) {}
  items: any;

    ngOnInit() {
        this.items = [
          {
            label: 'Categorías',
            icon: 'pi pi-fw pi-file',
            routerLink: ['/categories'],
          },
          {
            label: 'Tiendas',
            icon: 'pi pi-fw pi-file',
            routerLink: ['/stores'],
          },
          {
            label: 'Productos',
            icon: 'pi pi-fw pi-file',
            routerLink: ['/products'],
          },
          {
            label: 'Ordenes',
            icon: 'pi pi-fw pi-file',
            routerLink: ['/orders'],
          },
        ];
    }
}
