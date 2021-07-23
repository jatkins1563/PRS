import { Component, OnInit } from '@angular/core';
import { RequestLine } from 'src/app/requestline/requestline.class';
import { Product } from 'src/app/product/product.class';
import { Request } from '../request.class';
import { RequestService } from '../request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from 'src/app/core/system.service';
import { User } from 'src/app/user/user.class';
import { RequestLineService } from 'src/app/requestline/requestline.service';

@Component({
  selector: 'app-request-lines',
  templateUrl: './request-lines.component.html',
  styleUrls: ['./request-lines.component.css']
})
export class RequestLinesComponent implements OnInit {

  request: Request = new Request;
  loggedInUser: User = new User;
  requestLines: RequestLine[] | null = [];
  products: Product[] = [];

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
    private requestLinesvc: RequestLineService,
    public syssvc: SystemService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    //pull request from URL
    this.refresh();
    this.loggedInUser = this.syssvc.getLoggedInUser();
  }

  refresh(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    const id = Number(routeParams.get('id'));
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
  }

  review(): void {
    this.requestsvc.review(this.request).subscribe(
      res => { console.debug("Review Successful!"); this.router.navigateByUrl("/request/list")},
      err => { console.debug(err); }
    )
  }

  create(): void {
    this.router.navigateByUrl(`/requestline/create/${this.request.id}`)
  }
  //delete for requestline
  delete(rlineId: number): void {
    console.debug("B4:", this.request);
    this.requestLinesvc.remove(rlineId).subscribe(
      res => { console.debug("Delete Successful!", this.request) },
      err => { console.error(err); },
      () =>
      this.refresh()
    )
  }
}
