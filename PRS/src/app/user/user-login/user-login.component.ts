import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.class';
import { UserService } from '../user.service';
import { SystemService } from 'src/app/core/system.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  badCredentials: boolean = false;

  constructor(
    private usersvc: UserService,
    private syssvc: SystemService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let printUser = this.syssvc.getLoggedInUser();
    console.debug("user: ", printUser);
  }

  
  login(): void {
    this.username = document.getElementsByTagName('input')[0].value;
    this.password = document.getElementsByTagName('input')[1].value;
    if(this.username === "" || this.password === "" || this.username === null || this.password === null) {
      console.debug("empty field");
      this.badCredentials = true;
      return;
    }
    console.debug("un: ", this.username, "pw: ", this.password)
    this.usersvc.login(this.username!, this.password!).subscribe(
      res => { 
        this.syssvc.setLoggedInUser(res);
        let printUser: User = this.syssvc.getLoggedInUser();
        console.debug("Login Successful!", printUser); this.router.navigateByUrl("/home")},
      err => { console.error(err);
        this.badCredentials = true;
      }
    )
  }
}