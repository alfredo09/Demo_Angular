import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/core/model/category';
import { HttpService } from 'src/app/core/services/http.service';
import { environment } from 'src/app/core/environments/environment.development';
import { TableComponent } from '../components/table/table.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService extends HttpService<Category> {

  @Output() triggerForm: EventEmitter<any> = new EventEmitter();
  @Output() triggerInfo: EventEmitter<any> = new EventEmitter();
  @Output() triggerDelete: EventEmitter<any> = new EventEmitter();
  @Output() triggerTable = new BehaviorSubject<TableComponent | null>(null);

  constructor(protected override http: HttpClient) {
    super(http, `${environment.apiUrl}/categories`);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/categories`);
  }
  
  public search(name: string): Observable<any> {
    return this.http.get<Category[]>(
      `${environment.apiUrl}/categories/search?some=${name}`);
  }
}
