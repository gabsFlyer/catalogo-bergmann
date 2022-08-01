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
import { FlyerProduct } from 'src/app/shared/models/flyer-product.model';


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

  productToAdd: FlyerProduct = new FlyerProduct();

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
    this.productToAdd = new FlyerProduct();
    this.filterProducts();
  }

  productSelected(event: MatAutocompleteSelectedEvent) {
    this.productToAdd.product = event.option.value;
  }

  // getProductName(productId: number): string {
  //   const products = this.products.filter(p => p.id === productId);
  //   return products.length > 0 ? products[0].name : '';
  // }

  // getProductValidity(product: any): string {
  //   if (product.pivot) {
  //     return product.pivot.validity;
  //   }

  //   const products = this.flyer.products.filter(p => p.id === product.id);
  //   return products.length > 0 ? products[0].validity : '';
  // }

  addProduct(): void {
    this.flyer.products.push(this.productToAdd);

    this.productSearchTerm = '';
    this.productToAdd = new FlyerProduct();
  }

  deleteProduct(product: FlyerProduct) {
    const index = this.flyer.products
      .indexOf(this.flyer.products.filter(p => p.id === product.id)[0]);

    this.flyer.products.splice(index, 1);
  }

}
