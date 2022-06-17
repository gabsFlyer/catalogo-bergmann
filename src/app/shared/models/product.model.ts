import { File } from "./file.model";
import { MeasurementUnit } from "./measurement-unit.model";

export class Product {
  id!: number;
  name!: string;
  description!: string;
  weight!: number;
  unit_price!: number;
  wholesale_price!: number;
  wholesale_minimum_quantity!: number;
  maximum_percent_discount!: number;
  measurement_unit!: MeasurementUnit;
  file!: File;

  measurement_unit_id!: number;
  file_id!: number;
}
