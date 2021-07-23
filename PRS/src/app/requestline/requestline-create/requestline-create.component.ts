import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { RequestLine } from 'src/app/requestline/requestline.class';
import { RequestLineService } from 'src/app/requestline/requestline.service';
import { Request } from 'src/app/request/request.class';
import { Product } from 'src/app/product/product.class';
import { ProductService } from 'src/app/product/product.service';

@Component({
  selector: 'app-requestline-create',
  templateUrl: './requestline-create.component.html',
  styleUrls: ['./requestline-create.component.css']
})
export class RequestLineCreateComponent implements OnInit {

  requestLine: RequestLine = new RequestLine;
  request: Request = new Request;
  reqId: number = 0;
  products: Product[] = [];

  constructor(
    private productsvc: ProductService,
    private requestLinesvc: RequestLineService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { 
    this.reqId = +this.activatedRoute.snapshot.paramMap.get('id')!;
  }

    save(): void {
      this.requestLine.id = +this.requestLine.id;
      this.requestLine.productId = +this.requestLine.productId;
      this.requestLine.requestId = this.reqId;
      console.debug("B4:", this.requestLine);
      this.requestLinesvc.create(this.requestLine).subscribe(
        res => { console.debug("Create Successful!", res); this.router.navigateByUrl(`request/lines/${this.reqId}`)},
        err => { console.debug(err); }
      )
    }
    //cancel/return to list
    return(): void {
      this.router.navigateByUrl(`request/lines/${this.reqId}`);
    }
  ngOnInit(): void {
    console.debug("reqId: ", this.reqId);
    this.requestLinesvc.list().subscribe(
      res => { console.debug(res); },
      err => { console.error(err); }
    )
    this.productsvc.list().subscribe(
      res => { console.debug("Products", res);
      this.products = res;
      },
      err => { console.error(err); } //,
      // () => 
      // // generates dropdown list
      //   {
      //   var element = document.createElement("option");
      //   var list = document.getElementById("productList");
      //   element.innerHTML = "Select Item";
      //   element.id = "product-1";
      //   element.value = "";
      //   element.setAttribute("selected", "");
      //   console.debug(`element: ${element.value} productid: ${element.id}`)
      //   list!.appendChild(element);
      //   }
      );
  }
}