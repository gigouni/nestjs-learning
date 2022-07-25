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

// Force to pass a Class to the Serialize interceptor
interface ClassConstructor {
  new (...args: any[]): {}; // eslint-disable-line
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

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
        return plainToClass(this.dto, data, {
          // Only return the @Expose-d property
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
