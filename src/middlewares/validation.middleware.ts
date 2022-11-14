import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { HttpException } from '@exceptions/HttpException';

const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true,
): RequestHandler => {
  return async (req, res, next) => {
    try {
      const errors = await validate(plainToInstance(type, req[value]), { skipMissingProperties, whitelist, forbidNonWhitelisted });
      if (errors.length > 0) {
        const errorBag = errors.reduce((prev, curr) => {
          prev[curr.property] = Object.values(curr.constraints);
          return prev;
        }, {});
        next(new HttpException(422, 'Validation failed', errorBag));
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
};

export default validationMiddleware;
