import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/product/product.class';
import { ProductService } from 'src/app/product/product.service';
import { SystemService } from 'src/app/core/system.service';
import { VendorService } from 'src/app/vendor/vendor.service';
import { Vendor } from 'src/app/vendor/vendor.class';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product: Product = new Product;
  vendors: Vendor[] = [];

  constructor(
    private syssvc: SystemService,
    private productsvc: ProductService,
    private vendorsvc: VendorService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.getId();
    this.productsvc.get(id).subscribe(
      res => { this.product = res; console.debug("Product loaded successfully.", res) },
      err => { console.error(err) }
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

    //saves changes
    save(): void {
      this.product.vendorId = +this.product.vendorId;
      console.debug("B4:", this.product);
      this.productsvc.change(this.product).subscribe(
        res => { console.debug("Edit Successful!"); this.router.navigateByUrl("/product/list")},
        err => { console.debug(err); }
      )
    }
    //cancel/return to list
    return(): void {
      this.router.navigateByUrl("/product/list");
    }

    //function to pull id from URL
    getId(): number {
      const routeParams = this.activatedRoute.snapshot.paramMap;
      const id = Number(routeParams.get('id'));
      return id;
    }
}