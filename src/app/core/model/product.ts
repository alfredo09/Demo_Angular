import { Base } from './base';
import { Category } from './category';

export class Product extends Base {
  id: number | null = null;
  name: string = '';
  description: string = '';
  price: number | null = null;
  stock: number | null = null;
  registrationDate: string = '';
  category: Category = new Category();
  categoryId: string = '';
  some:string = '';
}
