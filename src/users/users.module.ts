import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';

@Module({
  // In sub modules, we use the `.forFeature(...)` to bind entities
  imports: [TypeOrmModule.forFeature([User])],

  controllers: [UsersController],

  // Providers list the things we want to add the Dependency Injection Container
  providers: [UsersService, AuthService],
})
export class UsersModule {
  // Global scoped middleware
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
