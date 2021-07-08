import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/user/user.class';
import { UserService } from 'src/app/user/user.service';
import { SystemService } from 'src/app/core/system.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User;

  constructor(
    private syssvc: SystemService,
    private usersvc: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.getId();
    this.usersvc.get(id).subscribe(
      res => { this.user = res; console.debug("User loaded successfully.", res) },
      err => console.error(err)
    )
  }
    //saves changes
    save(): void {
      console.debug("B4:", this.user);
      this.usersvc.change(this.user).subscribe(
        res => { console.debug("Edit Successful!"); this.router.navigateByUrl("/user/list")},
        err => { console.debug(err); }
      )
    }
    //cancel/return to list
    return(): void {
      this.router.navigateByUrl("/user/list");
    }

    //function to pull id from URL
    getId(): number {
      const routeParams = this.activatedRoute.snapshot.paramMap;
      const id = Number(routeParams.get('id'));
      return id;
    }
}