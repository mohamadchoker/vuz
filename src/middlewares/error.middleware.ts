import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { logger } from '@utils/logger';

const errorMiddleware = async (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('error', error);
    const status: number = error.statusCode || 500;
    const title: string = error.title || 'Error';
    const message: string = error.message || 'Something went wrong';
    const errors: { [key: string]: string[] } = error.errors || undefined;

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    res.status(status).json({ error: { title: title, message: message, errors: errors } });
    await next(error);
  } catch (error) {
    console.log(error);
  }
};

export default errorMiddleware;
