import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';
import { Order } from 'src/app/core/model/order';
import { OrdersModule } from './orders.module';
import { OrdersService } from './services/orders.service';
import { mainTitles } from 'src/app/core/constants/labels';
import { resetValuesTypeStringDate } from 'src/app/core/utils/filtersTypeDate';
import DetailsOrdersComponent from '../details-orders/details-orders.component';
import { Store } from 'src/app/core/model/store';
import { StoresService } from '../stores/services/stores.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  imports: [CommonModule, OrdersModule, DetailsOrdersComponent],
})
export default class OrdersComponent implements OnInit {
  public titleOrder: any = mainTitles['orders'];
  public orders!: Order[];
  public order!: Order;
  public columns: string[] = [
    'description',
    'orderQuantity',
    'orderDate'
  ];
  public stores: Store[] = [];
  constructor(public ordersService: OrdersService, public storesService: StoresService) {}

  ngOnInit(): void {
    this.createGrid();
    this.ordersService.getFilteredData().subscribe(() => {
      this.createGrid();
    });
    this.retrieveObjectSelection();
    this.loadStores();
  }

  private retrieveObjectSelection() {
    this.ordersService
      .getSelectedData()
      .subscribe((response: Order) => {
        this.order = response;
      });
  }

  private createGrid() {
    this.ordersService
      .getAllOrders()
      .pipe(tap((items: Order[]) => {
        resetValuesTypeStringDate(items, ['date']);
        this.orders = items;
      }))
      .subscribe();
  }
  private loadStores() {
    this.storesService.findAll().subscribe({
      next: (response) => {
        this.stores = response;
      },
      error: (error) => {
        console.error('Error loading stores', error);
      }
    });
  }
}
