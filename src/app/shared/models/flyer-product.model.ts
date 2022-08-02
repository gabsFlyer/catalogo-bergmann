import { Product } from 'src/app/shared/models/product.model';

export class FlyerProduct {
  id!: number;
  validity!: string;

  product: Product = new Product();
}
