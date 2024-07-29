import { DropdownOption } from "../interfaces/dropdown-option.interface";

export function generateEnumOptions(enumType: any): DropdownOption[] {
  return Object.keys(enumType).map((key) => ({
    label: key,
    value: enumType[key],
  }));
}

export function enumToDropdownOptions(enumType: any): DropdownOption[] {
  return Object.keys(enumType).map((key) => ({
    label: enumType[key],
    value: key,
  }));
}

