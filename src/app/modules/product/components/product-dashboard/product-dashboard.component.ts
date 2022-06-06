import { Component, OnInit } from '@angular/core';
import { MeasurementUnitService } from 'src/app/modules/measurement-unit/services/measurement-unit.service';
import { MeasurementUnit } from 'src/app/shared/models/measurement-unit.model';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.css']
})
export class ProductDashboardComponent implements OnInit {

  product: Product = new Product();
  measurementUnits: Array<MeasurementUnit> = new Array;

  constructor(
    private measurementUnitService: MeasurementUnitService,
  ) { }

  ngOnInit(): void {
    this.loadMeasurementUnits();
  }

  loadMeasurementUnits() {
    this.measurementUnitService.getMeasurementUnits()
      .subscribe({
        next: (measurementUnits: Array<MeasurementUnit>) => {
          this.measurementUnits = measurementUnits;
        }
      });
  }

}
