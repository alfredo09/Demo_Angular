import { FormControl, FormGroup, Validators } from '@angular/forms';
import { includedEnum } from '../enums/common.enum';
export class FormUtils {
  static getDefaultProgramFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl('', { nonNullable: true }),
      code: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(150)]),
    });
  };
  static getDefaultOrderFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl('', { nonNullable: true }),
      name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      date: new FormControl('', [Validators.required]),
      shippingAddress: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      isDelivery: new FormControl(false, { nonNullable: true }),
      storeId: new FormControl(null, [Validators.required]),
    });
  }
  static getDefaultCategoryFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl('', { nonNullable: true }),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  static getDefaultStoreFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl('', { nonNullable: true }),
      name: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      openingHours: new FormControl('', [Validators.required]),
    });
  }
  static getDefaultProductFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      stock: new FormControl('', [Validators.required]),
      registrationDate: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
    });
  }
}
