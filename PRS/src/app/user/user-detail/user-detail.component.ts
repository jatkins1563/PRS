import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.class';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user!: User;
  delVerify: boolean = false;
  
  constructor(
    private usersvc: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }
    
    ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    const id = Number(routeParams.get('id'));
    this.usersvc.get(id).subscribe(
      res => {console.debug(res);
      this.user = res;},
      err => console.error(err)
    );
  };

  return(): void {
    this.router.navigateByUrl("/user/list");
  }

  verify(): void {
    this.delVerify = !this.delVerify;
  }

  delete(): void {
    console.debug("B4:", this.user);
    this.usersvc.remove(this.user).subscribe(
      res => { console.debug("Delete Successful!", this.user); this.router.navigateByUrl("/user/list")},
      err => { console.error(err); }
    )
  }
}
