import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { tap, catchError, of } from 'rxjs';
import { Category } from 'src/app/core/model/category';
import { CategoriesService } from '../../services/categories.service';
import { MessageService } from 'primeng/api';
import { HelpersService } from 'src/app/core/services/helpers.service';
import { TableComponent } from '../table/table.component';
import { messages } from 'src/app/core/constants/messages';
import { labels,titles,buttons } from 'src/app/core/constants/labels';
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

  private category!: Category;
  private categoryResponse: any;
  private tableComponent: TableComponent | null = null;

  constructor(
    private categoriesService: CategoriesService,
    private helpersService: HelpersService,
  ) { }

  ngOnInit() {
    this.categoriesService.triggerForm.emit(this);
    this.form = FormUtils.getDefaultCategoryFormGroup();
    this.registerTableComponentListener();
    this.waitForDataSelection();
  }

  public save() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.category.id) {
        this.submitUpdate(this.category.id);
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
    if (this.categoryResponse && this.categoryResponse.id) {
      this.categoriesService
        .findById(parseInt(this.categoryResponse.id))
        .pipe(
          tap((category: any) => {
            this.category = category;
            this.updateFormValues(category);
            this.openDialog();
          })
        )
        .subscribe();
    } else {
      this.helpersService.messageNotification('info', messages.requiredSelection);
    }
  }

  private submitCreate() {
    const data: Category = {
      ...this.form.value,
    };
    this.tableComponent?.reload();

    if (this.tableComponent){
      this.categoriesService
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
  }

  private submitUpdate(idCategory: number): void {
    const data: Category = {
      ...this.form.value,
    };

    this.tableComponent?.reload();

    if (this.tableComponent){
      this.categoriesService
      .update(idCategory, data)
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
  }

  private reset(): void {
    this.form.reset();
    this.category = new Category();
  }

  private updateFormValues(category: Category) {
    this.form.patchValue(category);
  }

  private registerTableComponentListener() {
    this.categoriesService.triggerTable.subscribe((tableComponent) => {
      this.tableComponent = tableComponent;
    });
  }

  private waitForDataSelection() {
    this.categoriesService.getSelectedData().subscribe((response) => {
      this.categoryResponse = response;
    });
  }
}
