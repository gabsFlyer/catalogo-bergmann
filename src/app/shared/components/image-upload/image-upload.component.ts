import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  imageDir: string = environment.api.images;
  @Input() source: string = '';

  get imageSource() {
    return this.source ? `${this.imageDir}/${this.source}` : '';
  }

  constructor() { }

  ngOnInit(): void {
  }

  fileChange($event: any) {
    console.log('filechange', $event);
  }

}
