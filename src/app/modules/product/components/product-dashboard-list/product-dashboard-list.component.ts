import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesConstant } from 'src/app/shared/constants/routes.constant';
import { IResponsePageable } from 'src/app/shared/interfaces/response-pageable.interface';
import { Product } from 'src/app/shared/models/product.model';
import { Utilities } from 'src/app/shared/util/utilities.util';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-dashboard-list',
  templateUrl: './product-dashboard-list.component.html',
  styleUrls: ['./product-dashboard-list.component.css']
})
export class ProductDashboardListComponent implements OnInit {

  currentPage: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 10;
  products: Array<Product> = new Array();

  constructor(
    private productService: ProductService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts(this.currentPage)
      .subscribe((products: IResponsePageable<Array<Product>>) => {
        this.products = products.data;
        this.itemsPerPage = products.per_page;
        this.totalItems = products.total;
      });
  }

  pageChange(page: number) {
    this.currentPage = page;
    this.loadProducts();
  }

  addProduct() {
    this.router.navigate([RoutesConstant.dashboard.products.new]);
  }

  editProduct(product: Product) {
    const url = Utilities.formatString(RoutesConstant.dashboard.products.edit, product.id.toString());
    this.router.navigate([url]);
  }

  deleteProduct(product: Product) {
    this.productService
      .destroyProduct(product.id)
      .subscribe(res => {
        this.loadProducts();
      });
  }

}
