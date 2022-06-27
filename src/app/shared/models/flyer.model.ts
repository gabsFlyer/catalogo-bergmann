import { Enterprise } from "./enterprise.model";

export class Flyer {
  id!: number;
  name!: string;
  valid_until!: string;

  enterprise: Enterprise = new Enterprise();
}
