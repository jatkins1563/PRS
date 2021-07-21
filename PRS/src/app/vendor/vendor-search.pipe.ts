import { Pipe, PipeTransform } from '@angular/core';
import { Vendor } from './vendor.class';

@Pipe({
  name: 'vendorSearch'
})
export class VendorSearchPipe implements PipeTransform {

  transform(vendors: Vendor[], searchCriteria: string): Vendor[] {
    if(vendors == null || searchCriteria.length === 0) {
      return vendors;
    }
    let search = searchCriteria.toLowerCase();
    let selectedVendors: Vendor[] = [];
    for(let v of vendors) {
      if(
        v.id.toString().toLowerCase().includes(search)
        || v.code.toLowerCase().includes(search)
        || v.name.toLowerCase().includes(search)
        || v.address.toLowerCase().includes(search)
        || v.city.toLowerCase().includes(search)
        || v.state.toLowerCase().includes(search)
        || v.zip.toLowerCase().includes(search)
        || ( v.phone !== null && v.phone?.toLowerCase().includes(search) )
        || ( v.email !== null && v.email?.toLowerCase().includes(search) )
        ) {
          selectedVendors.push(v);
      }
    }
    return selectedVendors;
  }

}
