import { Observable } from 'rxjs';
import { FlyerService } from './../../services/flyer.service';
import { Component, OnInit } from '@angular/core';
import { Flyer } from 'src/app/shared/models/flyer.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RoutesConstant } from 'src/app/shared/constants/routes.constant';
import { Enterprise } from 'src/app/shared/models/enterprise.model';
import { EnterpriseService } from 'src/app/modules/enterprise/services/enterprise.service';
import { ProductService } from 'src/app/modules/product/services/product.service';
import { Product } from 'src/app/shared/models/product.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


@Component({
  selector: 'app-flyer-dashboard',
  templateUrl: './flyer-dashboard.component.html',
  styleUrls: ['./flyer-dashboard.component.css']
})
export class FlyerDashboardComponent implements OnInit {

  flyer: Flyer = new Flyer();
  enterprises: Array<Enterprise> = new Array();

  products: Array<Product> = new Array();
  productsFiltered: Array<Product> = new Array();
  productSearchTerm: string = '';

  productToAdd: Product | undefined;

  constructor(
    private productService: ProductService,
    private enterpriseService: EnterpriseService,
    private flyerService: FlyerService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.flyerService.getFlyer(params['id'])
          .subscribe({
            next: (flyer: Flyer) => {
              this.flyer = flyer;
            },
            error: (err) => {
              this.router.navigate([RoutesConstant.dashboard.flyers.list]);
            }
          })
      }
    });

    this.loadProducts();
    this.loadEnterprises();
  }

  loadEnterprises() {
    this.enterpriseService.getEnterpriseList()
      .subscribe((enterpriseList: Array<Enterprise>) => {
        this.enterprises = enterpriseList;
      })
  }

  loadProducts() {
    this.productService.getProductList()
      .subscribe((productList: Array<Product>) => {
        this.products = productList;
        this.filterProducts();
      })
  }

  editing(): boolean {
    return !!this.flyer.id;
  }

  cancel() {
    this.router.navigate([RoutesConstant.dashboard.flyers.list]);
  }

  save() {
    if (this.editing()) {
      this.flyerService.updateFlyer(this.flyer.id, this.flyer)
        .subscribe({
          next: (flyer: Flyer) => {
            this.toastr.success('Registro editado com sucesso');
            this.router.navigate([RoutesConstant.dashboard.flyers.list]);
          },
          error: (err) => {
            if (err.status !== 422) {
              this.toastr.error('Houve um erro ao editar o catálogo');
            }
          }
        });
    } else {
      this.flyerService.storeFlyer(this.flyer)
        .subscribe({
          next: (flyer: Flyer) => {
            this.toastr.success('Registro salvo com sucesso');
            this.router.navigate([RoutesConstant.dashboard.flyers.list]);
          },
          error: (err) => {
            if (err.status !== 422) {
              this.toastr.error('Houve um erro ao salvar o catálogo');
            }
          }
        });
    }
  }

  displayProductName(product: Product) {
    return product && product.name ? product.name : '';
  }

  filterProducts(): void {
    this.productsFiltered = this.products.filter(p => {
      const productName = p.name.toLowerCase();
      return productName.includes(this.productSearchTerm);
    })
  }

  onProductSearchTermChange(productSearchTerm: string) {
    this.productSearchTerm = productSearchTerm;
    this.productToAdd = undefined;
    this.filterProducts();
  }

  productSelected(event: MatAutocompleteSelectedEvent) {
    this.productToAdd = event.option.value;
  }

}
