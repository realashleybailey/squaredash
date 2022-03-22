import { Request, Response, NextFunction } from 'express';
// Needed to wrap async routes in express to handle errors properly
const asyncMiddleware = (fn: (arg0: Request, arg1: Response, arg2: NextFunction) => any) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncMiddleware;