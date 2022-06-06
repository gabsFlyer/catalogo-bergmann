import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { MeasurementUnitService } from 'src/app/modules/measurement-unit/services/measurement-unit.service';
import { MeasurementUnit } from 'src/app/shared/models/measurement-unit.model';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from '../../services/product.service';

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
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadMeasurementUnits();

    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.productService.getProduct(params['id'])
          .subscribe({
            next: (product: Product) => {
              this.product = product;
            },
            error: (err) => {
              this.router.navigate(['dashboard/products']);
            }
          });
      }
    })
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
