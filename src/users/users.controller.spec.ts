import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: 'awesome' } as User]);
      },
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'azerty@example.com',
          password: 'hashedPassword',
        } as User);
      },
      // remove: (id) => {
      //   const user = users.splice(users.indexOf());
      // },
      // update: () => {},
    };

    fakeAuthService = {
      // signup: () => {},
      // signin: () => {},
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],

      // Tell to Jest to use the mocked services instead of the real ones
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        { provide: AuthService, useValue: fakeAuthService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllUsers', () => {
    it('should find all users using a given email', async () => {
      const users = await controller.findAllUsers('email@example.com');
      expect(users.length).toEqual(1);
      expect(users[0].email).toEqual('email@example.com');
    });
  });

  describe('findUser', () => {
    it('should find one user using a given ID', async () => {
      const user = await controller.findUser('123');
      expect(user.id).toEqual(123);
    });

    it('should throw an error if a user with a given ID is not found', async () => {
      fakeUsersService.findOne = () => null;
      await expect(controller.findUser('123')).rejects.toThrow(
        new Error('User not found'),
      );
    });
  });
});
