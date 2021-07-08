import { Pipe, PipeTransform } from '@angular/core';
import { User } from './user.class';

@Pipe({
  name: 'userSearch'
})
export class UserSearchPipe implements PipeTransform {

  transform(users: User[], searchCriteria: string): User[] {
    if(users == null || searchCriteria.length === 0) {
      return users;
    }
    let search = searchCriteria.toLowerCase();
    let selectedUsers: User[] = [];
    for(let u of users) {
      if(
        u.id.toString().toLowerCase().includes(search)
        || u.username.toLowerCase().includes(search)
        || u.firstname.toLowerCase().includes(search)
        || u.lastname.toLowerCase().includes(search)
        || u.isReviewer.toString().toLowerCase().includes(search)
        || ( u.phone !== null && u.phone?.toLowerCase().includes(search) )
        || ( u.email !== null && u.email?.toLowerCase().includes(search) )
        || u.isAdmin.toString().toLowerCase().includes(search)
        ) {
          selectedUsers.push(u);
      }
    }
    return selectedUsers;
  }

}
