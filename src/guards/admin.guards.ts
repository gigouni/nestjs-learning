import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Request lifecycle
    //      Request
    //         |
    //         v
    //      Cookie middleware
    //         |
    //         v
    //      AdminGuard
    //         |
    //         v
    //      Interceptor in
    //         |
    //         v
    //      Request handler
    //         |
    //         v
    //      Interceptor out
    //         |
    //         v
    //      Response
    // The AdminGuard is running before the interceptor which injects the currentUser prop
    // The previous interceptor has been replaced by the CurrentUserMiddleware
    //    to perform operations before the AdminGuard and have required properties
    const request = context.switchToHttp().getRequest();

    // Return a boolean, <true> if the user is an admin, <false> otherwise
    return !!request.currentUser?.admin;
  }
}
