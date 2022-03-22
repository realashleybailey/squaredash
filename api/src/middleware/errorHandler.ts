import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

// eslint-disable-next-line no-unused-vars
const errorHandler = (err: { expose: boolean; status: any; }, req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line no-console
  console.error(err);
  // if the error is safe to expose to client
  if (err.expose === true) {
    res.status(err.status || 500).send(err);
  } else {
    res.status(500).send(new createError.InternalServerError());
  }
};

export default errorHandler;