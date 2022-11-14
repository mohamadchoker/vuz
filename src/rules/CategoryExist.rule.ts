import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import DB from '@databases';
import { logger } from '@utils/logger';

@ValidatorConstraint({ name: 'CategoryExistsd', async: true })
export class IsCategoryAlreadyExistConstraint implements ValidatorConstraintInterface {
  async validate(id: number, args: ValidationArguments) {
    try {
      const category = await DB.Category.findOne({ where: { id } });
      if (category) return true;
      return false;
    } catch (error) {
      logger.error('IsCategoryAlreadyExistConstraint', error);
      return false;
    }
  }
}

export function IsCategoryAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCategoryAlreadyExistConstraint,
    });
  };
}
