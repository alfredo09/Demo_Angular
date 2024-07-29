import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Store } from 'src/app/core/model/store';
import { StoresService } from '../../services/stores.service';
import { ModalFormsComponent } from '../modal-forms/modal-forms.component';
import { TableComponent } from '../table/table.component';
import { ModalInfoComponent } from 'src/app/shared/components/modal-info/modal-info.component';
import { ModalDeleteComponent } from 'src/app/shared/components/modal-delete/modal-delete.component';
import { tooltip } from 'src/app/core/constants/labels';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  public items: MenuItem[] = [];
  public cardMenu: MenuItem[] = [];
  public storeSelectedTable: any;
  public storeDialog: boolean = false;
  public storeDialogDelete: boolean = false;
  public storeDialogInfo: boolean = false;
  public submitted: boolean = false;
  public store = new Store();
  public data: object = {};
  public date: Date | undefined;
  public tooltip = tooltip;

  private modalFormsComponent!: ModalFormsComponent;
  private modalInfoComponent!: ModalInfoComponent;
  private modalDeleteComponent!: ModalDeleteComponent;
  private tableComponent: TableComponent | null = null;

  constructor(private storesService: StoresService) { }

  ngOnInit() {
    this.storesService.triggerForm.subscribe((modalFormsComponent) => {
      this.modalFormsComponent = modalFormsComponent;
    });

    this.storesService.triggerInfo.subscribe((modalInfoComponent) => {
      this.modalInfoComponent = modalInfoComponent;
    });

    this.storesService.triggerDelete.subscribe((modalDeleteComponent) => {
      this.modalDeleteComponent = modalDeleteComponent;
    });

    this.storesService.triggerTable.subscribe((tableComponent) => {
      this.tableComponent = tableComponent;
    });
  }

  public create() {
    this.modalFormsComponent.openCreate();
  }
  public edit() {
    this.modalFormsComponent.openEdit();
  }
  public deleteSelected() {
    this.modalDeleteComponent.openConfirm();
  }
  public info() {
    this.modalInfoComponent.openInfo();
  }
}