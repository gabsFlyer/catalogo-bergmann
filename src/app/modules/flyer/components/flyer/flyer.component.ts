import { Flyer } from 'src/app/shared/models/flyer.model';
import { Component, OnInit } from '@angular/core';
import { FlyerService } from '../../services/flyer.service';

@Component({
  selector: 'app-flyer',
  templateUrl: './flyer.component.html',
  styleUrls: ['./flyer.component.css']
})
export class FlyerComponent implements OnInit {

  flyer = new Flyer();

  constructor(
    private flyerService: FlyerService
  ) { }

  ngOnInit(): void {
    this.loadFlyer();
  }

  loadFlyer() {
    this.flyerService.getCurrentFlyer()
      .subscribe({
        next: (flyer: Flyer) => {
          this.flyer = flyer;
        },
        error: err => console.warn(err)
      })
  }

}
