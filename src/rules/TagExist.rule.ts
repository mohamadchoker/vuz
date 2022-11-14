import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import DB from '@databases';

@ValidatorConstraint({ name: 'TagExist', async: true })
export class IsTagAlreadyExistConstraint implements ValidatorConstraintInterface {
  async validate(ids: number[], args: ValidationArguments) {
    try {
      const tags = await DB.Tag.findAll({ where: { id: ids } });
      return tags.length === ids.length;
    } catch (error) {
      console.log('Error tag');
      console.log(error);
      return false;
    }
  }
}

export function IsTagAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsTagAlreadyExistConstraint,
    });
  };
}
