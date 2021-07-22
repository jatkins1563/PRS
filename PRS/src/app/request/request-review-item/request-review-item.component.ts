import { Component, OnInit } from '@angular/core';
import { RequestLine } from 'src/app/requestline/requestline.class';
import { Product } from 'src/app/product/product.class';
import { Request } from '../request.class';
import { RequestService } from '../request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from 'src/app/core/system.service';
import { User } from 'src/app/user/user.class';

@Component({
  selector: 'app-request-review-item',
  templateUrl: './request-review-item.component.html',
  styleUrls: ['./request-review-item.component.css']
})
export class RequestReviewItemComponent implements OnInit {
  request: Request = new Request;
  loggedInUser: User = new User;
  requestLines: RequestLine[] | null = [];
  products: Product[] = [];
  rejVerify: boolean = false;
  rejReason: boolean = false;

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
    private requestsvc: RequestService,
    public syssvc: SystemService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    //pull request from URL
    const routeParams = this.activatedRoute.snapshot.paramMap;
    const id = Number(routeParams.get('reqId'));
    this.requestsvc.get(id).subscribe(
      res => {console.debug("request: ", res);
      this.request = res;},
      err => console.error(err),
      () => {
      this.requestLines = this.request.requestLines;
      this.requestLines?.forEach( (rl) => {
        if(rl.product !== null) {
          rl.lineTotal = rl.quantity * rl.product.price;
        }
      });
      }
    );
    this.loggedInUser = this.syssvc.getLoggedInUser();
  }

  create(): void {
    this.router.navigateByUrl(`/requestline/create/${this.request.id}`)
  }
  
  verify(): void {
    this.rejVerify = !this.rejVerify;
    if(this.rejReason) {
      this.rejReason = false;
    }
  }

  rejectFail(): void {
    this.rejReason = true;
  }

  approve(): void {
    this.requestsvc.approve(this.request).subscribe(
      res => { console.debug("Approve Successful!", res); this.router.navigateByUrl(`/request/review/${this.loggedInUser.id}`)},
      err => { console.debug(err); }
    )
  }

  reject(): void {
    if(this.request.rejectionReason == "" || this.request.rejectionReason == null) {
      this.rejectFail();
      return;
    }
    this.requestsvc.reject(this.request).subscribe(
      res => { console.debug("Reject Successful!", res); this.router.navigateByUrl(`/request/review/${this.loggedInUser.id}`)},
      err => { 
        console.debug("request: ", this.request);
        console.debug(err);
      }
    )
  }
}
