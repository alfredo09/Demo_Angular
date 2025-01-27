import { Component, Input, ViewChild } from '@angular/core';
import { Product } from 'src/app/core/model/product';
import { DetailOrder } from 'src/app/core/model/detail-order';
import { ProductsService } from '../../services/products.service';
import { HelpersService } from 'src/app/core/services/helpers.service';
import { MessageService } from 'primeng/api';
import { FilterMatchMode } from "primeng/api";
import { Table } from 'primeng/table';
import { TableLazyLoadEvent } from 'primeng/table';
import { tap, catchError, of } from 'rxjs';
import { TableColumn } from 'src/app/core/interfaces/table-column.interface';
import { Pageable } from 'src/app/core/model/pageable';
import { IPageable } from 'src/app/core/interfaces/pageable/pageable.interface';
import { checkAppliedFilters } from 'src/app/core/utils/checkAppliedFilters';
import { mainTitles } from 'src/app/core/constants/labels';
import { messages } from 'src/app/core/constants/messages';
import { labels, buttons, titles, tooltip } from 'src/app/core/constants/labels';
import { TableColumnDefinitions } from 'src/app/core/utils/table-column-definitions';
import { ColumnFilterType } from 'src/app/core/enums/column-filter-type.enum';
import { CurrenciesEnum } from 'src/app/core/enums/currencies.enum';
import { common } from 'src/app/core/constants/common';
import { OrderDto } from 'src/app/core/model/order'; // Asegúrate de tener la ruta correcta
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/app/core/model/order';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [MessageService, HelpersService]
})
export class TableComponent {
  @Input() products!: Product[];
  @ViewChild(Table) dtProduct!: Table;

  public columns: TableColumn[] = [];
  public columnsToShow: string[] = ['name', 'description', 'stock', 'price', 'active'];
  public columnsStatus: TableColumn[] = [];
  public matchModeContains = [{ label: "Contiene", value: FilterMatchMode.CONTAINS }];
  public matchModeEquals = [{ label: "Igual a", value: FilterMatchMode.EQUALS }];
  public matchModeDate = [{ label: "La fecha es", value: FilterMatchMode.DATE_IS }];

  public titleProduct: any = mainTitles['products'];
  public selectedProducts: Product[] = [];
  public types: Record<string, string> | undefined;
  public firstPage = 0;
  public labels = labels;
  public titles = titles;
  public buttons = buttons;
  public messages = messages;
  public totalRecords: number = 0;
  public loading: boolean = true;
  public wildCard: string = '';
  public columnFilterTypes = ColumnFilterType;
  public common = common;

  private productFiltered: Product = new Product();
  private filtersAppliedColumns: any = {};
  private pageable: Pageable = new Pageable();

  public cart: DetailOrder[] = [];
  private storeId: number = 1; // Puedes obtener esto dinámicamente

  constructor(
    private productsService: ProductsService,
    private helpersService: HelpersService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.productsService.triggerTable.next(this);
    this.initializeColumnInformation();
    this.initializeDefaultVariables();
    this.loadCart();
  }

  ngAfterViewInit() {
    this.helpersService.translateChange('es')
  }

  public clear(table: Table) {
    table.clear();
  }

  public reload() {
    const data = new Product();
    this.productsService.setFilteredData(data);
    this.firstPage = 0;
  }

  public onRowSelect(event: any) {
    this.sendSelectedProduct(event.data);
  }

  public onRowUnselect(event: any) {
    this.sendSelectedProduct(new Product);
  }

  public onGlobalFilter() {
    if (this.wildCard.length >= 3 || this.wildCard.length === 0) {
      if (!this.filtersAppliedColumns) {
        this.filtersAppliedColumns = {};
      }
      this.filtersAppliedColumns.some = this.wildCard;
      this.createGrid(this.filtersAppliedColumns);
    }
  }

  public loadProducts(event: TableLazyLoadEvent) {
    this.pageable.setPageableValues(event);
    this.filtersAppliedColumns = event.filters || {};
    this.createGrid(this.filtersAppliedColumns);
  }

  public createGrid(filtersAppliedColumns?: any) {
    this.loading = true;
    this.productsService
      .pageable(this.pageable, this.productFiltered, filtersAppliedColumns ? filtersAppliedColumns : '')
      .pipe(
        tap((page: IPageable<Product>) => {
          this.products = page.content;
          this.totalRecords = page.totalElements;
          this.loading = true;
        }),
        catchError(err => of('error',
          err.map((message: any) => {
            this.helpersService.messageNotification('error', message);
          })
        )))
      .subscribe();
  }

  public clearfilter() {
    this.wildCard = '';
    this.reload();
  }

  public setCurrencyForFormat(columnDefinition: TableColumn, currency: string): TableColumn {
    const currencyEnum = currency === "Bolivianos" ? CurrenciesEnum.Bolivianos : CurrenciesEnum.Dolares
    return { currency: currencyEnum, ...columnDefinition }
  }

  public filterColumns(event: any) {
    this.updateColumnsDisplay(event);
  }

  private initializeDefaultVariables() {
    this.productFiltered = new Product();
    this.pageable = new Pageable();
    this.firstPage = 0;
    this.productsService.getFilteredData().subscribe((response: Product) => {
      this.productFiltered = response;
      this.createGrid();
    });
  }

  private initializeColumnInformation() {
    this.columns = TableColumnDefinitions.getProductTableColumnsDefinition();
    this.columnsStatus = this.initializeColumnsStatus();
  }

  private initializeColumnsStatus(): TableColumn[] {
    return this.columns.filter((column) =>
      this.columnsToShow.includes(column.field)
    );
  }

  private updateColumnsDisplay(event: TableColumn[]) {
    this.columnsStatus = event;
    if (!this.filtersAppliedColumns) {
      this.filtersAppliedColumns = {};
    }
    checkAppliedFilters(event, this.columnsToShow, this.filtersAppliedColumns) ? this.clear(this.dtProduct) : '';
    this.columnsToShow = event.map(column => column.field);
  }

  private sendSelectedProduct(selectedProduct: Product) {
    this.productsService.setSelectedData(selectedProduct);
  }

  public addToCart(product: Product) {
    if (product.id === null) {
      console.error('El producto no tiene un ID válido.');
      return;
    }

    let cart = JSON.parse(localStorage.getItem('cart') || '[]') as DetailOrder[];
    const productId = product.id.toString();
    const existingProductIndex = cart.findIndex((item: DetailOrder) => item.productId === productId);

    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity++;
    } else {
      const newCartItem: DetailOrder = {
        id: null,
        quantity: 1,
        order: new Order(),
        orderId: '',
        product: product,
        productId: productId,
        active: false,
        createdBy: '',
        updatedBy: '',
        createdAt: '',
        updatedAt: ''
      };
      cart.push(newCartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    this.loadCart();
    alert('Producto añadido al carrito!');
  }

  public loadCart() {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
  }

  public increaseQuantity(item: DetailOrder) {
    item.quantity++;
    this.updateCart();
  }

  public decreaseQuantity(item: DetailOrder) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCart();
    }
  }

  public removeItem(item: DetailOrder) {
    this.cart = this.cart.filter(i => i.productId !== item.productId);
    this.updateCart();
  }

  public updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  public getTotal(): number {
    // Calcula el total
    const total = this.cart.reduce((total, item) => {
      const price = item.product.price ?? 0;
      const quantity = item.quantity ?? 0;
      return total + (price * quantity);
    }, 0);
  
    // Prepara los datos para almacenar
    const cartDetails = this.cart.map(item => ({
      productId: item.productId,
      price: item.product.price,
      quantity: item.quantity
    }));
  
    // Guarda en localStorage
    localStorage.setItem('cartDetails', JSON.stringify(cartDetails));
    localStorage.setItem('totalPrice', total.toFixed(2)); // Guarda el total con 2 decimales
  
    // Retorna el total calculado
    return total;
  }
  
  public retrieveCartItems() {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    console.log('Lista de productos en el carrito:', this.cart);
  }

  public finalizePurchase() {
    if (this.cart.length === 0) {
      alert('El carrito está vacío. No puedes finalizar la compra.');
      return;
    }
  
    const order = this.createOrderFromCart();
  
    this.productsService.createOrder(order).subscribe(
      (response: { orderId: number }) => {
        const orderId = response.orderId;
        if (orderId) {
          alert('Compra finalizada exitosamente!');
          localStorage.removeItem('cart');
          this.cart = [];
        } else {
          console.error('El ID de la orden no está disponible.');
          alert('Hubo un error al finalizar la compra. Por favor, intente nuevamente.');
        }
      },
      error => {
        console.error('Error al crear la orden:', error);
        alert('Hubo un error al finalizar la compra. Por favor, intente nuevamente.');
      }
    );
  }
  
  private createOrderFromCart(): OrderDto {
    const orderDto: OrderDto = {
      name: 'Order Name',
      date: new Date().toISOString().split('T')[0],
      shippingAddress: 'Shipping Address',
      delivery: true,
      storeId: 1,
      orderDetails: this.cart.map(item => ({
        productId: Number(item.productId),
        quantity: item.quantity,
        price: item.product.price,
      }))
    };

    return orderDto;
  }

  submitOrder() {
    const order = this.createOrderFromCart();
    this.productsService.createOrder(order).subscribe(
      (response: any) => {
        console.log('Compra finalizada exitosamente:', response); 
      },
      error => {
        console.error('Error al crear la orden:', error);
      }
    );
  }
  public showCartDetails() {
    const cartDetails = JSON.parse(localStorage.getItem('cartDetails') || '[]');
    const totalPrice = localStorage.getItem('totalPrice') || '0.00';

    // Muestra los detalles en la consola por ahora
    console.log('Detalles del Carrito:', cartDetails);
    console.log('Total Precio:', totalPrice);

    // Para una mejor experiencia de usuario, considera mostrar en una ventana emergente o en una sección adicional del HTML
    alert(`Detalles del Carrito:\n\n${cartDetails.map((item: { productId: any; price: any; quantity: any; }) => 
      `Producto ID: ${item.productId}, Precio: ${item.price}, Cantidad: ${item.quantity}`
    ).join('\n')}\n\nTotal: ${totalPrice}`);
  }
}
