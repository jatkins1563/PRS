import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from '../request.class';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {
  request!: Request;
  delVerify: boolean = false;
  
  constructor(
    private requestsvc: RequestService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }
    
    ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    const id = Number(routeParams.get('id'));
    this.requestsvc.get(id).subscribe(
      res => {console.debug(res);
      this.request = res;},
      err => console.error(err)
    );
  };

  return(): void {
    this.router.navigateByUrl("/request/list");
  }

  verify(): void {
    this.delVerify = !this.delVerify;
  }

  delete(): void {
    console.debug("B4:", this.request);
    this.requestsvc.remove(this.request).subscribe(
      res => { console.debug("Delete Successful!", this.request); this.router.navigateByUrl("/request/list")},
      err => { console.error(err); }
    )
  }
}
