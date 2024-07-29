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