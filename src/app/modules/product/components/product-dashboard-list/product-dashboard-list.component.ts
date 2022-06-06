import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IResponsePageable } from 'src/app/shared/interfaces/response-pageable.interface';
import { Product } from 'src/app/shared/models/product.model';
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
    this.router.navigate(['dashboard/products/new']);
  }

  editProduct(product: Product) {
    console.log('editing product ', product);
  }

  deleteProduct(product: Product) {
    console.log('deleting product ', product);
  }

}
