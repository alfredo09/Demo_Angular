import { Base } from './base';
import { Store } from './store';

export class Order extends Base {
  id: number | null = null;
  name: string = '';
  date: string = '';
  shippingAddress: string = '';
  isDelivery: boolean = false;
  store: Store = new Store();
  storeId: string = '';
}

export interface OrderDetail {
  productId: number;
  quantity: number;
}

export interface OrderDto {
  name: string;
  date: string; // Asegúrate de enviar en formato 'YYYY-MM-DD'
  shippingAddress: string;
  delivery: boolean;
  storeId: number;
  orderDetails: OrderDetail[];
}