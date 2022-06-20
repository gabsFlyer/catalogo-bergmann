import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MeasurementUnitService } from 'src/app/modules/measurement-unit/services/measurement-unit.service';
import { RoutesConstant } from 'src/app/shared/constants/routes.constant';
import { File } from 'src/app/shared/models/file.model';
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

  get productImage() {
    return this.product.file ? this.product.file.file_name : '';
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
              this.product.file = this.product.file ?? new File();
              this.product.measurement_unit = this.product.measurement_unit ?? new MeasurementUnit();
            },
            error: (err) => {
              this.router.navigate([RoutesConstant.dashboard.products.list]);
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
    this.router.navigate([RoutesConstant.dashboard.products.list]);
  }

  save() {
    if (this.product.id) {
      this.productService.updateProduct(this.product.id.toString(), this.product)
        .subscribe({
          next: (product: Product) => {
            this.toastr.success('Registro salvo com sucesso');
            this.router.navigate([RoutesConstant.dashboard.products.list]);
          },
          error: (err) => {
            this.toastr.error('Houve um erro ao salvar o produto');
            console.error(err);
          }
        });
    }
  }

}
