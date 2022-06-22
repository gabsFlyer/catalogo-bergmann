import { File } from "./file.model";
import { MeasurementUnit } from "./measurement-unit.model";

export class Product {
  id!: number;
  name!: string;
  description!: string;
  weight!: number;
  purchase_price!: number;
  unit_price!: number;
  wholesale_price!: number;
  wholesale_minimum_quantity!: number;
  maximum_percent_discount!: number;
  measurement_unit: MeasurementUnit = new MeasurementUnit();
  file: File = new File();
}
