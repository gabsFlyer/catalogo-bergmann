import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  get productMeasurementeUnit() {
    return this.product.measurement_unit_id ?? this.product.measurement_unit.id;
  }

  set productMeasurementeUnit(id: number) {
    this.product.measurement_unit_id = id;
  }

  constructor(
    private measurementUnitService: MeasurementUnitService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
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

  cancel() {
    this.router.navigate(['dashboard/products']);
  }

  save() {
    if (this.product.id) {
      this.productService.updateProduct(this.product.id.toString(), this.product)
        .subscribe({
          next: (product: Product) => {
            this.toastr.success('Registro salvo com sucesso')
            this.router.navigate(['dashboard/products']);
          },
          error: (err) => {
            this.toastr.error('Houve um erro ao salvar o produto');
            console.error(err);
          }
        })
    }
  }

}
