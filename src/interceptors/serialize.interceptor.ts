import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { UserDto } from '../users/dtos/user.dto';

export class SerializeInterceptor implements NestInterceptor {
  intercept(
    _: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // Run something before a reuest is handled
    // by the reuest handler
    console.log(`I'm running before the handler` /*, context*/);

    return next.handle().pipe(
      map((data: UserDto) => {
        // Run something before the responses is sent out
        console.log(`I'm running before response is sent out`, data);
        return plainToClass(UserDto, data, {
          // Only return the @Expose-d property
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
