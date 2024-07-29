import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { catchError, BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/app/core/environments/environment.development';
import { Product } from 'src/app/core/model/product';
import { HttpService } from 'src/app/core/services/http.service';
import { IPageable } from 'src/app/core/interfaces/pageable/pageable.interface';
import { Pageable } from 'src/app/core/model/pageable';
import { paramsForPageable } from 'src/app/core/utils/extractValuesFilters';
import { TableComponent } from '../components/table/table.component';
import { DetailOrder } from 'src/app/core/model/detail-order';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends HttpService<Product> {

  @Output() triggerForm: EventEmitter<any> = new EventEmitter();
  @Output() triggerInfo: EventEmitter<any> = new EventEmitter();
  @Output() triggerDelete: EventEmitter<any> = new EventEmitter();
  @Output() triggerTable = new BehaviorSubject<TableComponent | null>(null);


  private columnsToShow = [
    { name: 'name', type: 'text' },
    { name: 'description', type: 'text' },
    { name: 'stock', type: 'text' },
    { name: 'price', type: 'text' },
    { name: 'category', type: 'text' },
    { name: 'registrationDate', type: 'date' },
    { name: 'active', type: 'text' },
  ];

  private ordersUrl = `${environment.apiUrl}/orders`;

  constructor(protected override http: HttpClient) {
    super(http, `${environment.apiUrl}/products`);
  }

  public createProduct(product: Product) {
    const productToSend = {
        ...product,
        category: {
            id: product.categoryId
        }
    };

    return this.http.post<Product>(this.url, productToSend).pipe(
        catchError(this.handleError)
    );
}
  
  public pageable(pageable: Pageable, filterSelected: any, product: Product) {
    return this.http.get<IPageable<Product>>(
      `${this.url}/pageable?` +
      `page=${pageable.page}&` +
      `size=${pageable.size}&` +
      `sortBy=${pageable.sortBy}&` +
      `sortOrder=${pageable.sortOrder}&` +
      `some=${product.some?product.some:''}&` +
      `${paramsForPageable(this.columnsToShow, product)}`
    ).pipe(catchError(this.handleError));
  }

  public createOrder(order: any) {
    return this.http.post<any>(this.ordersUrl, order).pipe(
      catchError(this.handleError)
    );
  }
  
  public getOrderDetails(orderId: number): Observable<DetailOrder[]> {
    return this.http.get<DetailOrder[]>(`${this.ordersUrl}/details`).pipe(
      catchError(this.handleError)
    );
  }
}