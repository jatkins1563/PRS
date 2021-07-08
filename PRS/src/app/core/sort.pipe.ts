import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(items: any[], column: string = "id", isAsc: boolean = true): any[] {

    let sortFn = (a: any, b: any): number => {
      if(a[column] == null) {
        a[column] = "";
      } 
      if(b[column] == null) {
        b[column] = "";
      } 
      let x = (typeof a[column] === "number") ? a[column] : a[column].toString().toLowerCase();
      let y = (typeof b[column] === "number") ? b[column] : b[column].toString().toLowerCase();
      let sortResult = 0;
      if(x === y) {
        return 0;
      }
      if(x > y) {
        sortResult = 1;
      } else {
        sortResult = -1;
      }
      //for descending order
      if(isAsc === false) {
        sortResult *= -1;
      }
      return sortResult;
    };

    return items.sort(sortFn);
  }

}
