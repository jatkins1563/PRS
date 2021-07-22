import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Request } from 'src/app/request/request.class';
import { RequestService } from 'src/app/request/request.service';
import { SystemService } from 'src/app/core/system.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {

  request: Request = new Request;

  constructor(
    private syssvc: SystemService,
    private requestsvc: RequestService,
    private router: Router
  ) { }

    save(): void {
      this.request.id = +this.request.id;
      this.request.userId = +this.syssvc.getLoggedInUser().id;
      console.debug("B4:", this.request);
      this.requestsvc.create(this.request).subscribe(
        res => { console.debug("Create Successful!", res); this.router.navigateByUrl("/request/list")},
        err => { console.debug(err); }
      )
    }
    //cancel/return to list
    return(): void {
      this.router.navigateByUrl("/request/list");
    }
  ngOnInit(): void {
    this.requestsvc.list().subscribe(
      res => { console.debug(res); },
      err => { console.error(err); }
    )
  }
}