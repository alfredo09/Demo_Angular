import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from 'src/app/core/model/store';
import { HttpService } from 'src/app/core/services/http.service';
import { environment } from 'src/app/core/environments/environment.development';
import { Observable } from 'rxjs';
import { TableComponent } from '../components/table/table.component';

@Injectable({
  providedIn: 'root',
})
export class StoresService extends HttpService<Store> {

  @Output() triggerForm: EventEmitter<any> = new EventEmitter();
  @Output() triggerInfo: EventEmitter<any> = new EventEmitter();
  @Output() triggerDelete: EventEmitter<any> = new EventEmitter();
  @Output() triggerTable = new BehaviorSubject<TableComponent | null>(null);

  constructor(protected override http: HttpClient) {
    super(http, `${environment.apiUrl}/stores`);
  }

  public search(store: Store): Observable<any> {
    return this.http.get<Store[]>(
      `${environment.apiUrl}/stores/search?`
    );
  }
}
