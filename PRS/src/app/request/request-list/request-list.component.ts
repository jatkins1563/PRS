import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemService } from 'src/app/core/system.service';
import { User } from 'src/app/user/user.class';
import { UserService } from 'src/app/user/user.service';
import { Request } from '../request.class';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  requests: Request[] = [];
  users: User[] = [];

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
    private syssvc: SystemService,
    private requestsvc: RequestService,
    private usersvc: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.requestsvc.list().subscribe(
      res => { console.debug("Requests", res);
      this.requests = res;
   },
      err => { console.error(err); },
      () => this.assignUsers()
    );
  }
   //pulls users for virtual property of request
   assignUsers(): void {
    for(let r of this.requests) {
      this.usersvc.get(r.userId).subscribe(
        res => {console.debug(res);
          r.user = res;},
        err => console.error(err)
      );
    }
  }
  review(): void {
    this.router.navigateByUrl(`/request/review/${this.syssvc.loggedInUser.id}`);
  }
}