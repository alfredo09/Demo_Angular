import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { tap, catchError, of } from 'rxjs';
import { Order } from 'src/app/core/model/order';
import { OrdersService } from '../../services/orders.service';
import { MessageService } from 'primeng/api';
import { HelpersService } from 'src/app/core/services/helpers.service';
import { TableComponent } from '../table/table.component';
import { messages } from 'src/app/core/constants/messages';
import { labels,titles,buttons } from 'src/app/core/constants/labels';
import { FormUtils } from 'src/app/core/utils/form-groups';
import { StoresService } from 'src/app/modules/stores/services/stores.service';
import { Store } from 'src/app/core/model/store';
import { toDMYdateFormat, toYMDdateFormat } from 'src/app/core/utils/format-date';
@Component({
  selector: 'app-modal-forms',
  templateUrl: './modal-forms.component.html',
  styleUrls: ['./modal-forms.component.scss'],
  providers: [MessageService, HelpersService]
})
export class ModalFormsComponent {
  public submitted: boolean = false;
  public dialog: boolean = false;
  public titleForm: string = "";
  public messages = messages;
  public labels = labels;
  public buttons = buttons;
  public form: FormGroup = new FormGroup({});
  public stores: Store[] = [];

  private order!: Order;
  private orderResponse: any;
  private tableComponent!: TableComponent;
  private tableComponentTypePropertyAssets!: TableComponent;

  constructor(
    private ordersService: OrdersService,
    private helpersService: HelpersService,
    private storesService: StoresService,
  ) { }

  ngOnInit() {
    this.ordersService.triggerForm.emit(this);
    this.form = FormUtils.getDefaultOrderFormGroup();
    this.registerTableComponentListener();
    this.waitForDataSelection();
  }

  ngAfterViewInit() {
    this.helpersService.translateChange('es')
  }

  public save() {
    this.submitted = true;
    if (this.form.valid) {
      const data: Order = {
        ...this.form.value,
        date: this.setYMDdatesFormat().date,
      };
      if (this.order.id) {
        this.submitUpdate(this.order.id);
      } else {
        this.submitCreate();
      }
    }
  }

  public openDialog() {
    this.dialog = true;
    this.loadModels();
    this.submitted= false;
  }
  
  public hideDialog() {
    this.dialog = false;
    this.submitted = false;
  }

  public openCreate() {
    this.reset();
    this.submitted = false;
    this.titleForm = titles.create;
    this.openDialog();
  }

  public openEdit() {
    this.titleForm = titles.edit;
    if (this.orderResponse && this.orderResponse.id) {
      this.ordersService
        .findById(parseInt(this.orderResponse.id))
        .pipe(
          tap((order: any) => {
            this.order = order;
            this.updateFormValues(order);
            this.openDialog();
          })
        )
        .subscribe();
    } else {
      this.helpersService.messageNotification('info', messages.requiredSelection);
    }
  }

  private registerTableComponentListener() {
    this.ordersService.triggerTable.subscribe((tableComponent) => {
      this.tableComponent = tableComponent;
    });
  }

  private waitForDataSelection() {
    this.ordersService.getSelectedData().subscribe((response) => {
      this.orderResponse = response;
    });
  }

  private submitCreate() {
    const data: Order = {
      ...this.form.value,
    };
    data.date = this.setYMDdatesFormat().date;
    this.ordersService
      .create(data)
      .pipe(
        tap(() => {
          this.hideDialog();
          this.helpersService.messageNotification('success', messages.successCreate);
          this.tableComponent.reload();
          this.tableComponentTypePropertyAssets.reload();
          this.reset();
        }),
        catchError(err => of('error',
          err.map((message: any) => {
            this.helpersService.messageNotification('error', message);
          })
        ))
      )
      .subscribe();

  }

  private submitUpdate(idOrder: number): void {
    const data: Order = {
      ...this.form.value,
    };
    data.date = this.setYMDdatesFormat().date;
    this.ordersService
      .update(idOrder, data)
      .pipe(
        tap(() => {
          this.hideDialog();
          this.helpersService.messageNotification('success', messages.successUpdate);
          this.tableComponent.reload();
        }),
        catchError(err => of('error',
          err.map((message: any) => {
            this.helpersService.messageNotification('error', message);
          })
        ))
      )
      .subscribe();
  }

  private reset(): void {
    this.form.reset();
    this.order = new Order();
  }

  private updateFormValues(order: Order) {
    this.form.patchValue(order);
    this.form.patchValue({
      date: toDMYdateFormat(order.date),
    });
  }

  private loadModels() {
    this.storesService.findAll().subscribe({
      next: (response) => (this.stores = response),
      error: (error) =>
        this.helpersService.messageNotification('error', error.message),
    });
  }
  
  private setYMDdatesFormat() {
    const formattedDate = toYMDdateFormat(this.form.get('date')?.value);
    return {
      date: formattedDate ?? '',
    }
  }
}
