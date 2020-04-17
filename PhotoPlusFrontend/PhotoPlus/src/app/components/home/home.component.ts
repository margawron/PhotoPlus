import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product/product.service";
import { Product } from '../../models/product/product';
import { CategoryService } from "../../services/category/category.service";
import { Category } from '../../models/category/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[];
  categories: Category[];

  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe((data: Product[]) => {
      this.products = data;
      this.products.forEach(element => { this.productService.getDataFromLinks(element) });
    });
    this.categoryService.getAll().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

}