import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Order } from 'src/app/core/model/order';
import { OrdersService } from '../../services/orders.service';
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
  public orderSelectedTable: any;
  public orderDialog: boolean = false;
  public orderDialogDelete: boolean = false;
  public orderDialogInfo: boolean = false;
  public submitted: boolean = false;
  public order = new Order();
  public data: object = {};
  public date: Date | undefined;
  public tooltip = tooltip;

  private modalFormsComponent!: ModalFormsComponent;
  private modalInfoComponent!: ModalInfoComponent;
  private modalDeleteComponent!: ModalDeleteComponent;
  private tableComponent!: TableComponent;

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.ordersService.triggerForm.subscribe((modalFormsComponent) => {
      this.modalFormsComponent = modalFormsComponent;
    });

    this.ordersService.triggerInfo.subscribe((modalInfoComponent) => {
      this.modalInfoComponent = modalInfoComponent;
    });

    this.ordersService.triggerDelete.subscribe((modalDeleteComponent) => {
      this.modalDeleteComponent = modalDeleteComponent;
    });

    this.ordersService.triggerTable.subscribe((tableComponent) => {
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

