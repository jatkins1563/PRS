import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/vendor/vendor.class';
import { VendorService } from 'src/app/vendor/vendor.service';
import { Product } from '../product.class';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  vendors: Vendor[] = [];

  searchCriteria: string = "";
  sortColumn: string = "id";
  sortAsc: boolean = true;

  sortFn(column: string): void {
    if(column === this.sortColumn) {
      this.sortAsc = !this.sortAsc;
      return;
    }

    this.sortColumn = column;
    this.sortAsc = true;
  }

  constructor(
    private productsvc: ProductService,
    private vendorsvc: VendorService
  ) { }

  ngOnInit(): void {
    this.productsvc.list().subscribe(
      res => { console.debug("Products", res);
      this.products = res;
      },
      err => { console.error(err); },
      () => this.assignVendors()
    );

  }
  //pulls vendors for virtual property of product
  assignVendors(): void {
    for(let p of this.products) {
      this.vendorsvc.get(p.vendorId).subscribe(
        res => {console.debug(res);
          p.vendor = res;},
        err => console.error(err)
      );
    }
    console.debug("Products with vendors", this.products);
  }
}