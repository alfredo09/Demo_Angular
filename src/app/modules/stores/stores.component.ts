import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Store } from 'src/app/core/model/store';
import { StoresModule } from './stores.module';
import { StoresService } from './services/stores.service';
import { ModalInfoComponent } from 'src/app/shared/components/modal-info/modal-info.component';
import { ModalDeleteComponent } from 'src/app/shared/components/modal-delete/modal-delete.component';
import { mainTitles } from 'src/app/core/constants/labels';

@Component({
  selector: 'app-stores',
  standalone: true,
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
  imports: [StoresModule, ModalInfoComponent, ModalDeleteComponent],
})
export default class storesComponent implements OnInit {
  public titleStore: any = mainTitles['stores'];
  public stores!: Store[];
  public store!: Store;
  public columns: string[] = [
    'name',
    'city',
    'openingHours'
  ];
  
  constructor(public storesService: StoresService) {}

  ngOnInit(): void {
    this.createGrid();
    this.storesService.getFilteredData().subscribe(() => {
      this.createGrid();
    });
    this.retrieveObjectSelection();
  }

  private retrieveObjectSelection() {
    this.storesService
      .getSelectedData()
      .subscribe((response: Store) => {
        this.store = response;
      });
  }

  private createGrid() {
    this.storesService
      .findAll()
      .pipe(tap((items: Store[]) => (this.stores = items)))
      .subscribe();
  }
}

