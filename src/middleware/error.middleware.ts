import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers';

@Middleware({ type: 'after' })
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
  error (error: any, request: any, response: any, next: () => any) {
    console.log(error.status, error.message);
    const e = {
      status: error.status || 500,
      message: error.message || 'Something went wrong'
    };
    response.send({ error: e });
    next();
  }
}
