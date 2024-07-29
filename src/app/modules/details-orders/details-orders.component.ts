import { Component, OnInit, Input } from '@angular/core';
import { tap } from 'rxjs';
import { DetailOrder } from 'src/app/core/model/detail-order';
import { DetailsOrdersModule } from './details-orders.module';
import { DetailsOrdersService } from './services/details-orders.service';
import { mainTitles } from 'src/app/core/constants/labels';
import { Order } from 'src/app/core/model/order';

@Component({
  selector: 'app-details-orders',
  standalone: true,
  templateUrl: './details-orders.component.html',
  styleUrls: ['./details-orders.component.scss'],
  imports: [DetailsOrdersModule],
})
export default class DetailsOrdersComponent implements OnInit{
  @Input() order!: Order;

  public titleDetailOrder: any = mainTitles['detailsOrders'];
  public detailsOrders!: DetailOrder[];
  public detailOrder!: DetailOrder;
  
  constructor(public detailsOrdersService: DetailsOrdersService) {}

  ngOnInit(): void {
    const detailOrder: DetailOrder = new DetailOrder();
    this.detailsOrdersService.getFilteredData().subscribe((response) => {
      this.createGrid(response);
    });
    this.retrieveObjectSelection();
  }

  ngOnChanges() {
    const detailOrder: DetailOrder = new DetailOrder();
    if (this.order && this.order.id) {
      detailOrder.orderId = String(this.order.id);
      this.createGrid(detailOrder);
    }
  }
  private retrieveObjectSelection() {
    this.detailsOrdersService
      .getSelectedData()
      .subscribe((response: DetailOrder) => {
        this.detailOrder = response;
      });
  }

  private createGrid(detailOrder: DetailOrder) {
    this.detailsOrdersService
      .search(detailOrder)
      .pipe(tap((items: DetailOrder[]) => {
        this.detailsOrders = items;
      }))
      .subscribe();
  }
}
