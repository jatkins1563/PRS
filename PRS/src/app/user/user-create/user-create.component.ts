import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/user/user.class';
import { UserService } from 'src/app/user/user.service';
import { SystemService } from 'src/app/core/system.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user: User = new User;

  constructor(
    private syssvc: SystemService,
    private usersvc: UserService,
    private router: Router
  ) { }

    save(): void {
      this.user.id = +this.user.id //make it numeric
      console.debug("B4:", this.user);
      this.usersvc.create(this.user).subscribe(
        res => { console.debug("Create Successful!", res); this.router.navigateByUrl("/user/list")},
        err => { console.debug(err); }
      )
    }
    //cancel/return to list
    return(): void {
      this.router.navigateByUrl("/user/list");
    }

  ngOnInit(): void {
    this.usersvc.list().subscribe(
      res => { console.debug(res); },
      err => { console.error(err); }
    )
  }
}