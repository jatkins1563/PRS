import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestLine } from 'src/app/requestline/requestline.class';
import { RequestLineService } from 'src/app/requestline/requestline.service';
import { SystemService } from 'src/app/core/system.service';

@Component({
  selector: 'app-requestline-edit',
  templateUrl: './requestline-edit.component.html',
  styleUrls: ['./requestline-edit.component.css']
})
export class RequestLineEditComponent implements OnInit {

  requestLine: RequestLine = new RequestLine;

  constructor(
    private syssvc: SystemService,
    private requestLinesvc: RequestLineService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.getId();
    this.requestLinesvc.get(id).subscribe(
      res => { this.requestLine = res; console.debug("RequestLine loaded successfully.", res) },
      err => console.error(err)
    )
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
      this.router.navigateByUrl("request/request-lines");
    }

    //function to pull id from URL
    getId(): number {
      const routeParams = this.activatedRoute.snapshot.paramMap;
      const id = Number(routeParams.get('id'));
      return id;
    }
}