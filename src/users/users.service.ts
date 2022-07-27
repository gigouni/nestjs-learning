import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  // @InjectRepository(User) is necessary because we'reusing a generic User type with the Repository one
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string): Promise<User> {
    // The `create(...) method creates the User entity instance but doesn't persist it
    // It allows a prevalidation of the data based on decorators within the `user.entity.ts` file
    const user = this.repo.create({ email, password });

    // The `save(...)` method persists data to the database
    // We could save directly the user but we could lose the prevalidation thru the `create` step
    // Moreover, the TypeORM hooks like 'AfterInsert' or 'AfterUpdate' would not be triggered
    return this.repo.save(user);
  }

  findOne(id: number): Promise<User> | null {
    // If the WhoAmI request does not have any cookie stored
    if (!id) {
      return null;
    }

    return this.repo.findOneBy({ id });
  }

  find(email: string): Promise<User[]> {
    return this.repo.findBy({ email });
  }

  async update(id: number, attrs: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number): Promise<User> {
    const removedUser = await this.findOne(id);
    if (!removedUser) {
      throw new NotFoundException('User not found');
    }

    return this.repo.remove(removedUser);
  }
}
