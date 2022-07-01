import { Enterprise } from "./enterprise.model";
import { Product } from "./product.model";

export class Flyer {
  id!: number;
  name!: string;
  valid_until!: string;

  enterprise: Enterprise = new Enterprise();
  products: Array<Product> = new Array();
}
