import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/app/core/environments/environment.development';
import { DetailOrder } from 'src/app/core/model/detail-order';
import { HttpService } from 'src/app/core/services/http.service';
import { TableComponent } from '../components/table/table.component';
import { Order } from 'src/app/core/model/order';
@Injectable({
  providedIn: 'root'
})
export class DetailsOrdersService  extends HttpService<DetailOrder>{
  @Output() triggerForm: EventEmitter<any> = new EventEmitter();
  @Output() triggerInfo: EventEmitter<any> = new EventEmitter();
  @Output() triggerDelete: EventEmitter<any> = new EventEmitter();
  @Output() triggerTable = new BehaviorSubject<TableComponent | null>(null);

  constructor(protected override http: HttpClient) {
    super(http, `${environment.apiUrl}/detailsOrders`);
  }

  public search(detailOrder: DetailOrder): Observable<any> {
    return this.http.get<DetailOrder[]>(
      `${environment.apiUrl}/orders/details/${detailOrder.orderId}`);
  }
}
