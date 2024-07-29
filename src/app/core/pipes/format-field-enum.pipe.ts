import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'formatFieldEnumPipe'
})
export class FormatFieldEnumPipe implements PipeTransform {
  transform(value: string, enumType: any): string {
    return enumType[value] ?? value;
  }
}
