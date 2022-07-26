import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { CurrentUserInterceptor } from './interceptors/current-user-interceptor';

@Module({
  // In sub modules, we use the `.forFeature(...)` to bind entities
  imports: [TypeOrmModule.forFeature([User])],

  controllers: [UsersController],

  // Providers list the things we want to add the Dependency Injection Container
  providers: [
    UsersService,
    AuthService,

    // Globally scoped interceptor
    // Prevent to have to define this interceptor within each controller
    { provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor },
  ],
})
export class UsersModule {}
