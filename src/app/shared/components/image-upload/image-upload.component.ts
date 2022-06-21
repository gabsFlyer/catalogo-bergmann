import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { File } from '../../models/file.model';
import { ImageUploadService } from '../../services/image-upload.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  imageDir: string = environment.api.images;
  uploading: boolean = false;
  @Input() source: string = '';

  get imageSource() {
    return this.source ? `${this.imageDir}/${this.source}` : '';
  }

  constructor(
    private imageUploadService: ImageUploadService,
  ) { }

  ngOnInit(): void {
  }

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
              this.uploading = false;
              // console.log('upload', file);
            }
          });

        // console.log('upload', foo)
      }

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  // private createReader() {

  // }

  // selectFiles(event: any): void {
  //   this.message = [];
  //   this.progressInfos = [];
  //   this.selectedFiles = event.target.files;
  //   this.previews = [];

  //   if (this.selectedFiles && this.selectedFiles[0]) {
  //     const numberOfFiles = this.selectedFiles.length;

  //     for (let i = 0; i < numberOfFiles; i++) {
  //       const reader = new FileReader();

  //       reader.onload = (e: any) => {
  //         this.previews.push(e.target.result);
  //       };

  //       reader.readAsDataURL(this.selectedFiles[i]);
  //     }
  //   }
  // }

}
