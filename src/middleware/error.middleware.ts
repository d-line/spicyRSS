import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers';

// eslint-disable-next-line no-undef
@Middleware({ type: 'after' })
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
  error (error: any, request: any, response: any, next: () => any) {
    response.send(error);
    next();
  }
}
