import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatFieldStatus'
})
export class FormatFieldIncludedPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
      const statusMap: { [key: string]: string } = {
          'included': 'Incluido',
          'not_included': 'No incluido',
      };
      return statusMap[value.toLowerCase()] || 'Sin estado';
  }
}
