import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestLine } from 'src/app/requestline/requestline.class';
import { RequestLineService } from 'src/app/requestline/requestline.service';
import { SystemService } from 'src/app/core/system.service';
import { Product } from 'src/app/product/product.class';
import { ProductService } from 'src/app/product/product.service';

@Component({
  selector: 'app-requestline-create',
  templateUrl: './requestline-create.component.html',
  styleUrls: ['./requestline-create.component.css']
})
export class RequestLineCreateComponent implements OnInit {

  requestLine: RequestLine = new RequestLine;
  products: Product[] = [];

  constructor(
    private syssvc: SystemService,
    private productsvc: ProductService,
    private requestLinesvc: RequestLineService,
    private router: Router
  ) { }

    save(): void {
      this.requestLine.id = +this.requestLine.id;
      this.requestLine.productId = +this.requestLine.productId;
      console.debug("B4:", this.requestLine);
      this.requestLinesvc.create(this.requestLine).subscribe(
        res => { console.debug("Create Successful!", res); this.router.navigateByUrl("request/request-lines")},
        err => { console.debug(err); }
      )
    }
    //cancel/return to list
    return(): void {
      this.router.navigateByUrl("request/request-lines");
    }
  ngOnInit(): void {
    this.requestLinesvc.list().subscribe(
      res => { console.debug(res); },
      err => { console.error(err); }
    )
    this.productsvc.list().subscribe(
      res => { console.debug("Vendors", res);
      this.products = res;
      },
      err => { console.error(err); },
      () => 
      //generates dropdown list
      this.products.forEach((product) => {
        
        var element = document.createElement("option");
        var list = document.getElementById("productList");
        element.innerHTML = product.name;
        element.id = `product${product.id}`;
        element.value = `${product.id}`;
        list!.append(element);
        console.debug(`element: ${element.value}`)
      })
      
      );
  }
}