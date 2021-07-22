import { Pipe, PipeTransform } from '@angular/core';
import { Request } from './request.class';

@Pipe({
  name: 'requestSearch'
})
export class RequestSearchPipe implements PipeTransform {

  transform(requests: Request[], searchCriteria: string): Request[] {
    if(requests == null || searchCriteria.length === 0) {
      return requests;
    }
    let search = searchCriteria.toLowerCase();
    let selectedRequests: Request[] = [];
    for(let r of requests) {
      if(
        r.id.toString().toLowerCase().includes(search)
        || r.description.toLowerCase().includes(search)
        || r.status.toLowerCase().includes(search)
        || r.total.toString().toLowerCase().includes(search)
        || r.user?.firstname.toLowerCase().includes(search)
        ) {
          selectedRequests.push(r);
      }
    }
    return selectedRequests;
  }

}
