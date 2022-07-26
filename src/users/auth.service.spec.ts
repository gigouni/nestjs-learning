import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('service', () => {
  let service: AuthService;

  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];

    // Allows to override the fakeUsersService behavior
    // Mimic a database behavior to test with more reality context
    fakeUsersService = {
      find: (email) => {
        const filteredUsers = users.filter((user) => user.email == email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 99999),
          email,
          password,
        } as User;
        users.push(user);

        return Promise.resolve(user);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        // Mocks the Dependency Injection Container content for the UsersService usage
        { provide: UsersService, useValue: fakeUsersService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('signup', () => {
    it('creates an instance of auth service', () => {
      expect(service).toBeDefined();
    });

    it('creates a new user with a salted and hashed password', async () => {
      const user = await service.signup('azerty@example.com', 'awesome');

      expect(user.password).not.toEqual('awesome');
      const [salt, hash] = user.password.split('.');
      expect(salt).toBeDefined();
      expect(hash).toBeDefined();
    });

    it('throws an error if user signs up with email that is in use', async () => {
      await service.signup('azerty@example.com', 'awesome');

      await expect(
        service.signup('azerty@example.com', 'awesome'),
      ).rejects.toThrow(new BadRequestException('Email in use'));
    });
  });

  describe('signin', () => {
    it('throws if signin is called with an unused email', async () => {
      await expect(
        service.signin('azerty@example.com', 'awesome'),
      ).rejects.toThrow(new BadRequestException('User not found'));
    });

    it('throws if invalid password is provided', async () => {
      await service.signup('azerty@example.com', 'awesome');

      await expect(
        service.signin('azerty@example.com', 'notTheCorrectPassword'),
      ).rejects.toThrow(new BadRequestException('Bad password'));
    });

    it('returns an user if correct password is provided', async () => {
      await service.signup('azerty@example.com', 'awesome');

      const user = await service.signin('azerty@example.com', 'awesome');
      expect(user).toBeDefined();
    });
  });
});
