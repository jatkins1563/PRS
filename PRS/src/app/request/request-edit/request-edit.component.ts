import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from 'src/app/request/request.class';
import { RequestService } from 'src/app/request/request.service';
import { SystemService } from 'src/app/core/system.service';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css']
})
export class RequestEditComponent implements OnInit {

  request: Request = new Request;

  constructor(
    private syssvc: SystemService,
    private requestsvc: RequestService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.getId();
    this.requestsvc.get(id).subscribe(
      res => { this.request = res; console.debug("Request loaded successfully.", res) },
      err => console.error(err)
    )
  }
    //saves changes
    save(): void {
      console.debug("B4:", this.request);
      this.requestsvc.change(this.request).subscribe(
        res => { console.debug("Edit Successful!"); this.router.navigateByUrl("/request/list")},
        err => { console.debug(err); }
      )
    }
    //cancel/return to list
    return(): void {
      this.router.navigateByUrl("/request/list");
    }

    //function to pull id from URL
    getId(): number {
      const routeParams = this.activatedRoute.snapshot.paramMap;
      const id = Number(routeParams.get('id'));
      return id;
    }
}