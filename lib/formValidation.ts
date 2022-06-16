import { ValidationInterface } from '../interfaces/entity.interface';

export function formValidation(valid: ValidationInterface) {
  let validity = {};

  if (valid.required) {
    validity['required'] = 'این فیلد اجباری است';
  }

  if (valid.input) {
    if (valid.input.maxLength) {
      validity['maxLength'] = {
        value: valid.input.maxLength,
        message: `نباید بیشتر از ${valid.input.maxLength} کاراکتر باشد`,
      };
    }

    if (valid.input.minLength) {
      validity['minLength'] = {
        value: valid.input.minLength,
        message: `نباید کمتر از ${valid.input.minLength} کاراکتر باشد`,
      };
    }

    if (valid.input.max) {
      validity['max'] = {
        value: valid.input.max,
        message: `نباید بیشتر از ${valid.input.max}  باشد`,
      };
    }

    if (valid.input.min) {
      validity['min'] = {
        value: valid.input.min,
        message: `نباید کمتر از ${valid.input.min}  باشد`,
      };
    }

    if (valid.input.pattern) {
      validity['pattern'] = {
        value: new RegExp(valid.input.pattern),
        message: valid.input.message || 'خطا',
      };
    }
  }

  return validity;
}
