export interface validateType {
  value: string | number;
  required?: true | false;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export function validate(validatableInput: validateType) {
  if (validatableInput.required) {
    if (validatableInput.value.toString().length === 0) {
      return 'Value is required.';
    }
  }
  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === 'string'
  ) {
    if (validatableInput.value.length < validatableInput.minLength) {
      return `Character should have a minimum length of ${validatableInput.minLength}.`;
    }
  }
  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === 'string'
  ) {
    if (validatableInput.value.length > validatableInput.maxLength) {
      return `Character should have a maximum length of ${validatableInput.maxLength}.`;
    }
  }
  if (
    validatableInput.min != null &&
    typeof +validatableInput.value === 'number'
  ) {
    if (+validatableInput.value < validatableInput.min) {
      return `Participants should be greater than or equal to ${validatableInput.min}.`;
    }
  }
  if (
    validatableInput.max != null &&
    typeof +validatableInput.value === 'number'
  ) {
    if (+validatableInput.value > validatableInput.max) {
      return `Participants should be less than or equal to ${validatableInput.max}.`;
    }
  }

  return '';
}
