import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'categories',
    loadComponent: () => import('./modules/categories/categories.component'),
  },
  {
    path: 'stores',
    loadComponent: () => import('./modules/stores/stores.component'),
  },
  {
    path: 'products',
    loadComponent: () => import('./modules/products/products.component'),
  },
  {
    path: 'orders',
    loadComponent: () => import('./modules/orders/orders.component'),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

