import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { User } from '../user.entity';

// Add or update Express types to add the currentUser property
/* eslint-disable */
declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}
/* eslint-enable */

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.userService.findOne(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      req.currentUser = user;
    }

    next();
  }
}
