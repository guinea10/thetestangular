import { AbstractControl } from '@angular/forms';
export class Validation {

  static isNumberInteager(control: AbstractControl) {
    const value = control.value;
    const num = '0123456789';
    if (value != null && value !== '') {
      for (let i = 0; i < value.length; i++) {
        if (num.indexOf(value[i]) === -1) {
          return { isNumberInteager: true };
        }
      }
      return null;
    } else {
      return { isNumberInteager: true };
    }
    return null;
  }

  static isNumberInteagerFirstZero(control: AbstractControl) {
    const value = control.value;
    const num = '0123456789';
    if(value.length >= 2 && value[0] === '0')
      return { isNumberInteagerFirstZero: true };
    if (value != null && value !== '') {
      for (let i = 0; i < value.length; i++) {
        if (num.indexOf(value[i]) === -1) {
          return { isNumberInteagerFirstZero: true };
        }
      }
      return null;
    } else {
      return { isNumberInteagerFirstZero: true };
    }
    return null;
  }

  static isNumberDecimal(control: AbstractControl) {
    const value = control.value;
    if (value === null || value === '') {
      return { isNumberDecimal: true };
    } else {
      if (value.length > 2) {
        if (value[0] === '0' && value[1] !== '.') {
          return { isNumberDecimal: true };
        }
      }
      const num = '0123456789';
      let contpunto = 0;
      for (let i = 0; i < value.length; i++) {
        if (contpunto >= 2) {
          return { isNumberDecimal: true };
        }
        if (num.indexOf(value[i]) !== -1) {
          continue;
        } else if (value[i] === '.') {
          if (i === 0 || i === value.length - 1) {
            return { isNumberDecimal: true };
          }
          contpunto += 1;
        } else {
          return { isNumberDecimal: true };
        }
      }
    }
    return null;
  }
}
