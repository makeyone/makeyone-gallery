/* eslint-disable no-restricted-globals */
/* eslint-disable class-methods-use-this */
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'maxNumber', async: false })
export class MaxNumber100Validator implements ValidatorConstraintInterface {
  validate(value: number) {
    return isNaN(value) === true || value <= 100;
  }

  defaultMessage() {
    return '100 이하로 입력해주세요.';
  }
}
