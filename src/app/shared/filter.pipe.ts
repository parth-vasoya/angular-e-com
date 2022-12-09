import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products: any[], searchText: string): any[] {
    if (!products.length) {
      return [];
    }
    if (!searchText) {
      return products;
    } else {
      return products.filter(product => {
        return product.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase());
      });
    }
  }
}
