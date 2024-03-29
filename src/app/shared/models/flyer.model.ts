import { Enterprise } from "./enterprise.model";
import { FlyerProduct } from "./flyer-product.model";

export class Flyer {
  id!: number;
  name!: string;
  initial_date!: string;
  final_date!: string;

  enterprise: Enterprise = new Enterprise();
  products: Array<FlyerProduct> = new Array();
}
