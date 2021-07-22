import { Injectable } from '@angular/core';
import { User } from '../user/user.class';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  
  loggedInUser: User = new User;

  constructor() { 
    console.debug("syssvc started, user: ", this.loggedInUser);
  }

  getLoggedInUser() {
    return this.loggedInUser;
  }

  setLoggedInUser(user: User) {
    this.loggedInUser = user;
  }
}
