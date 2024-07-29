import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/app/core/model/order';
import { HttpService } from 'src/app/core/services/http.service';
import { environment } from 'src/app/core/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService extends HttpService<Order> {

  @Output() triggerForm: EventEmitter<any> = new EventEmitter();
  @Output() triggerInfo: EventEmitter<any> = new EventEmitter();
  @Output() triggerDelete: EventEmitter<any> = new EventEmitter();
  @Output() triggerTable: EventEmitter<any> = new EventEmitter();

  constructor(protected override http: HttpClient) {
    super(http, `${environment.apiUrl}/orders`);
  }

  public getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.apiUrl}/orders`);
  }
}
