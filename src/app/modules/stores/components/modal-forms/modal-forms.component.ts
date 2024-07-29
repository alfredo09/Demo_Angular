import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { tap, catchError, of } from 'rxjs';
import { Store } from 'src/app/core/model/store';
import { StoresService } from '../../services/stores.service';
import { MessageService } from 'primeng/api';
import { HelpersService } from 'src/app/core/services/helpers.service';
import { TableComponent } from '../table/table.component';
import { messages } from 'src/app/core/constants/messages';
import { labels, titles, buttons } from 'src/app/core/constants/labels';
import { FormUtils } from 'src/app/core/utils/form-groups';

@Component({
  selector: 'app-modal-forms',
  templateUrl: './modal-forms.component.html',
  styleUrls: ['./modal-forms.component.scss'],
  providers: [MessageService, HelpersService]
})
export class ModalFormsComponent {
  public form: FormGroup = new FormGroup({});
  public submitted: boolean = false;
  public dialog: boolean = false;
  public titleForm: string = "";
  public messages = messages;
  public labels = labels;
  public buttons = buttons;

  private store!: Store;
  private storeResponse: any;
  private tableComponent: TableComponent | null = null;

  constructor(
    private storesService: StoresService,
    private helpersService: HelpersService,
  ) { }

  ngOnInit() {
    this.storesService.triggerForm.emit(this);
    this.form = FormUtils.getDefaultStoreFormGroup();
    this.registerTableComponentListener();
    this.waitForDataSelection();
  }

  public save() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.store.id) {
        this.submitUpdate(this.store.id);
      } else {
        this.submitCreate();
      }
    }
  }

  public openDialog() {   
    this.submitted = false;
    this.dialog = true;
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
    if (this.storeResponse && this.storeResponse.id) {
      this.storesService
        .findById(parseInt(this.storeResponse.id))
        .pipe(
          tap((store: any) => {
            this.store = store;
            this.updateFormValues(store);
            this.openDialog();
          })
        )
        .subscribe();
    } else {
      this.helpersService.messageNotification('info', messages.requiredSelection);
    }
  }

  private submitCreate() {
    const data: Store = {
      ...this.form.value,
    };
    this.tableComponent?.reload();

    this.storesService
      .create(data)
      .pipe(
        tap(() => {
          this.hideDialog();
          this.helpersService.messageNotification('success', messages.successCreate);
          this.tableComponent!.reload();
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

  private submitUpdate(idStore: number): void {
    const data: Store = {
      ...this.form.value,
    };

    this.tableComponent?.reload();
    
      this.storesService
      .update(idStore, data)
      .pipe(
        tap(() => {
          this.hideDialog();
          this.helpersService.messageNotification('success', messages.successUpdate);
          this.tableComponent!.reload();
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
    this.store = new Store();
  }

  private updateFormValues(store: Store) {
    this.form.patchValue(store);
  }

  private registerTableComponentListener() {
    this.storesService.triggerTable.subscribe((tableComponent) => {
      this.tableComponent = tableComponent;
    });
  }

  private waitForDataSelection() {
    this.storesService.getSelectedData().subscribe((response) => {
      this.storeResponse = response;
    });
  }
}
