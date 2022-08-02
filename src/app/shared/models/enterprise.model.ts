import { File } from "./file.model";

export class Enterprise {
  id!: number;
  name!: string;
  whatsapp!: string;

  file: File = new File();
}
