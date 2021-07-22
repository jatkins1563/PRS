import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/product/product.class';
import { ProductService } from 'src/app/product/product.service';
import { VendorService } from 'src/app/vendor/vendor.service';
import { Vendor } from 'src/app/vendor/vendor.class';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = new Product;
  vendors: Vendor[] = [];

  constructor(
    private productsvc: ProductService,
    private vendorsvc: VendorService,
    private router: Router
  ) { }

    save(): void {
      this.product.id = +this.product.id
      this.product.vendorId = +this.product.vendorId
      console.debug("B4:", this.product);
      this.productsvc.create(this.product).subscribe(
        res => { console.debug("Create Successful!", res); this.router.navigateByUrl("/product/list")},
        err => { console.debug(err); }
      )
    }
    //cancel/return to list
    return(): void {
      this.router.navigateByUrl("/product/list");
    }
  ngOnInit(): void {
    this.productsvc.list().subscribe(
      res => { console.debug(res); },
      err => { console.error(err); }
    )
    this.vendorsvc.list().subscribe(
      res => { console.debug("Vendors", res);
      this.vendors = res;
      },
      err => { console.error(err); },
      () => 
      //generates dropdown list
      this.vendors.forEach((vendor) => {
        
        var element = document.createElement("option");
        var list = document.getElementById("vendorList");
        element.innerHTML = vendor.name;
        element.id = `vendor${vendor.id}`;
        element.value = `${vendor.id}`;
        list!.append(element);
        console.debug(`element: ${element.value}`)
      })
      
      );
    }
}