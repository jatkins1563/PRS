import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/core/system.service';
import { User } from '../user.class';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

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
    private usersvc: UserService,
    private syssvc: SystemService
  ) { }

  ngOnInit(): void {
    let printUser = this.syssvc.getLoggedInUser();
    console.debug("user: ", printUser);
    this.usersvc.list().subscribe(
      res => { console.debug("Users", res);
      this.users = res;
   },
      err => { console.error(err); }
    );
  }

}