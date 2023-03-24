import { Product } from 'src/app/shared/models/product.model';

export class FlyerProduct {
  id!: number;
  validity!: string;
  offer_price!: number;

  product: Product = new Product();
}
