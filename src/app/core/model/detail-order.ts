import { Base } from './base';
import { Order } from './order';
import { Product } from './product';

export class DetailOrder extends Base {
    id: number | null = null;
  quantity: number = 0;
  order: Order = new Order();
  orderId: string = '';
  product: Product = new Product();
  productId: string = '';
}
