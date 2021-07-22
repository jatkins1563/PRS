import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestLine } from 'src/app/requestline/requestline.class';
import { RequestLineService } from 'src/app/requestline/requestline.service';
import { SystemService } from 'src/app/core/system.service';
import { ProductService } from 'src/app/product/product.service';
import { Product } from 'src/app/product/product.class';

@Component({
  selector: 'app-requestline-edit',
  templateUrl: './requestline-edit.component.html',
  styleUrls: ['./requestline-edit.component.css']
})
export class RequestLineEditComponent implements OnInit {

  requestLine: RequestLine = new RequestLine;
  products: Product[] = [];
  reqId: number = 0;
  rlineId: number = 0;

  constructor(
    private syssvc: SystemService,
    private requestLinesvc: RequestLineService,
    private productsvc: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { 
    this.reqId = +this.activatedRoute.snapshot.paramMap.get('reqId')!;
    this.rlineId = +this.activatedRoute.snapshot.paramMap.get('rlineId')!;
  }

  ngOnInit(): void {
    const id = this.getId();
    this.requestLinesvc.get(id).subscribe(
      res => { this.requestLine = res; console.debug("RequestLine loaded successfully.", res) },
      err => console.error(err)
    )
    this.productsvc.list().subscribe(
      res => { console.debug("Products", res);
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
        console.debug(`element: ${element.value} productid: ${product.id}`)
        list!.append(element);
      })
      
    );
  }
    //saves changes
    save(): void {
      console.debug("B4:", this.requestLine);
      this.requestLinesvc.change(this.requestLine).subscribe(
        res => { console.debug("Edit Successful!"); this.router.navigateByUrl("request/request-lines")},
        err => { console.debug(err); }
      )
    }
    //cancel/return to list
    return(): void {
      this.router.navigateByUrl(`request/lines/${this.reqId}`);
    }

    //function to pull id from URL
    getId(): number {
      const routeParams = this.activatedRoute.snapshot.paramMap;
      const id = Number(routeParams.get('rlineId'));
      return id;
    }
}