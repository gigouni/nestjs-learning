import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';

@Module({
  // In sub modules, we use the `.forFeature(...)` to bind entities
  imports: [TypeOrmModule.forFeature([User])],

  providers: [UsersService, AuthService],
  controllers: [UsersController],
})
export class UsersModule {}
