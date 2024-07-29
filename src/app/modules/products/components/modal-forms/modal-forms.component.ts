import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { catchError, of, tap } from 'rxjs';
import { Product } from 'src/app/core/model/product';
import { Category } from 'src/app/core/model/category';
import { ProductsService } from '../../services/products.service';
import { CategoriesService } from 'src/app/modules/categories/services/categories.service';
import { HelpersService } from 'src/app/core/services/helpers.service';
import { MessageService } from 'primeng/api';
import { TableComponent } from '../table/table.component';
import { messages } from 'src/app/core/constants/messages';
import { labels, titles, buttons } from 'src/app/core/constants/labels';
import { toYMDdateFormat, toDMYdateFormat } from 'src/app/core/utils/dateFormats';
import { FormUtils } from 'src/app/core/utils/form-groups';
import { includedEnum } from 'src/app/core/enums/common.enum';

@Component({
  selector: 'app-modal-forms',
  templateUrl: './modal-forms.component.html',
  styleUrls: ['./modal-forms.component.scss'],
  providers: [MessageService, HelpersService],
})

export class ModalFormsComponent {
  public form: FormGroup = new FormGroup({});
  public categories: Category[] = [];
  public submitted: boolean = false;
  public dialog: boolean = false;
  public titleForm: string = '';
  public labels = labels;
  public buttons = buttons;
  public messages = messages;

  private product: Product = new Product();
  private productResponse: Product = new Product();
  private tableComponent!: TableComponent;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private helpersService: HelpersService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly ngZone: NgZone,
  ) { }

  ngOnInit() {
    this.productsService.triggerForm.emit(this);
    this.form = FormUtils.getDefaultProductFormGroup();
    this.registerTableComponentListener();
    this.waitForDataSelection();
    this.loadCategories();
  }

  public hideDialog() {
    this.dialog = false;
    this.submitted = false;
  }

  public openCreate() {
    this.reset();
    this.submitted = false;
    this.titleForm = titles.create;
    this.dialog = true;
  }

  public openEdit() {
    this.titleForm = titles.edit;
    if (this.productResponse && this.productResponse.id) {
      this.productsService
        .findById(this.productResponse.id)
        .pipe(
          tap((product: any) => {
            this.product = product;
            this.updateFormValues(product);
            this.dialog = true;
          }),
          catchError((err) =>
            of(
              'error',
              err.map((message: any) => {
                this.helpersService.messageNotification('error', message);
              })
            )
          )
        )
        .subscribe();
    } else {
      this.helpersService.messageNotification('info', 'Seleccione un equipo.');
    }
  }

  public save() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.product.id) {
        this.submitUpdate(this.product.id);
      } else {
        this.submitCreate();
      }
    }
  }

  public loadCategories() {
    this.categoriesService.getAllCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
        console.log('Categories loaded:', this.categories); 
      },
      (error) => {
        console.error('Error loading categories:', error);
      }
    );
  }

  private reset(): void {
    this.form.reset();
    this.product = new Product();
  }

  private submitCreate() {
    const formValue = this.form.value;
  
    const data: Product = {
      ...formValue,
      registrationDate: this.setYMDdatesFormat().registrationDate,
      categoryId: formValue.categoryId || null, 
    };
  
    console.log('Data to create:', data);
  
    this.productsService.create(data).pipe(
      tap(() => {
        this.dialog = false;
        this.helpersService.messageNotification('success', messages.successCreate);
        this.tableComponent.reload();
        this.reset();
      }),
      catchError((err) => {
        console.error('Error creating product:', err);
        this.helpersService.messageNotification('error', 'Error creating product');
        return of();
      })
    ).subscribe();
  }
  

  private submitUpdate(productId: number): void {
    const data: Product = {
      ...this.form.value,
    };
    data.registrationDate = this.setYMDdatesFormat().registrationDate;
    this.productsService
      .update(productId, data)
      .pipe(
        tap(() => {
          this.dialog = false;
          this.helpersService.messageNotification(
            'success',
            messages.successUpdate
          );
          this.tableComponent.reload();
        }),
        catchError((err) =>
          of(
            'error',
            err.map((message: any) => {
              this.helpersService.messageNotification('error', message);
            })
          )
        )
      )
      .subscribe();
  }

  private setYMDdatesFormat() {
    return {
      registrationDate: toYMDdateFormat(this.form.get('registrationDate')?.value),
    }
  }

  private updateFormValues(product: Product) {
    this.form.patchValue(product);
    this.form.patchValue({
      categoryId: product.category.id,
    });
    this.form.get('registrationDate')!.patchValue(toDMYdateFormat(product.registrationDate));
  }

  private registerTableComponentListener() {
    this.productsService.triggerTable.subscribe((tableComponent) => {
      this.tableComponent = tableComponent!;
    });
  }

  private waitForDataSelection() {
    this.productsService.getSelectedData().subscribe((response) => {
      this.productResponse = response;
    });
  }
}

