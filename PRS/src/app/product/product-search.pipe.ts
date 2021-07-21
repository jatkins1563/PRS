import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product.class';

@Pipe({
  name: 'productSearch'
})
export class ProductSearchPipe implements PipeTransform {

  transform(products: Product[], searchCriteria: string): Product[] {
    if(products == null || searchCriteria.length === 0) {
      return products;
    }
    let search = searchCriteria.toLowerCase();
    let selectedProducts: Product[] = [];
    for(let p of products) {
      if(
        p.id.toString().toLowerCase().includes(search)
        || p.partNbr.toLowerCase().includes(search)
        || p.name.toLowerCase().includes(search)
        || p.price.toLowerCase().includes(search)
        || p.unit.toLowerCase().includes(search)
        || ( p.photoPath !== null && p.photoPath?.toLowerCase().includes(search) )
        || p.vendorId.toString().toLowerCase().includes(search)
        // || p.vendor?.name.toLowerCase().includes(search)
        ) {
          selectedProducts.push(p);
      }
    }
    return selectedProducts;
  }

}
