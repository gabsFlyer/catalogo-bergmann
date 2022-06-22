import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { File } from '../../models/file.model';
import { ImageUploadService } from '../../services/image-upload.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {

  imageDir: string = environment.api.images;
  uploading: boolean = false;
  @Input() source: string = '';
  @Output() fileUploaded = new EventEmitter<File>();

  get imageSource() {
    return this.source ? `${this.imageDir}/${this.source}` : '';
  }

  constructor(
    private imageUploadService: ImageUploadService,
  ) { }

  fileChange(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.uploading = true;

      const reader = new FileReader();
      reader.onload = (e : any) => {
        const image = e.target.result;

        this.imageUploadService.storeImage(image)
          .subscribe({
            next: (file: File) => {
              this.source = file.file_name;
              this.fileUploaded.emit(file);

              this.uploading = false;
            }
          });
      }

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

}
