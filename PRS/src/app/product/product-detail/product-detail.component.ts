import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorService } from 'src/app/vendor/vendor.service';
import { Product } from '../product.class';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  delVerify: boolean = false;
  
  constructor(
    private productsvc: ProductService,
    private vendorsvc: VendorService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }
    
    ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    const id = Number(routeParams.get('id'));
    this.productsvc.get(id).subscribe(
      res => {console.debug(res);
      this.product = res;},
      err => console.error(err),
      () => this.assignVendor(this.product.vendorId)
    );
  };

  return(): void {
    this.router.navigateByUrl("/product/list");
  }

  verify(): void {
    this.delVerify = !this.delVerify;
  }

  delete(): void {
    console.debug("B4:", this.product);
    this.productsvc.remove(this.product).subscribe(
      res => { console.debug("Delete Successful!", this.product); this.router.navigateByUrl("/product/list")},
      err => { console.error(err); }
    )
  }
  //pulls vendor for virtual property of product
  assignVendor(id: number): void {
    console.debug("ID: ", id)
    this.vendorsvc.get(id).subscribe(
      res => {console.debug(res);
        this.product.vendor = res;},
      err => console.error(err)
    );
  }
}
