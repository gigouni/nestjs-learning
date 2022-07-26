import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let authService: AuthService;

  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // Allows to override the fakeUsersService behavior
    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        // Mocks the Dependency Injection Container content for the UsersService usage
        { provide: UsersService, useValue: fakeUsersService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('signup', () => {
    it('creates an instance of auth service', () => {
      expect(authService).toBeDefined();
    });

    it('creates a new user with a salted and hashed password', async () => {
      const user = await authService.signup('azerty@example.com', 'awesome');

      expect(user.password).not.toEqual('awesome');
      const [salt, hash] = user.password.split('.');
      expect(salt).toBeDefined();
      expect(hash).toBeDefined();
    });

    it('throws an error if user signs up with email that is in use', async () => {
      fakeUsersService.find = () =>
        Promise.resolve([
          { id: 1, email: 'azerty@example.com', password: 'bbb' } as User,
        ]);

      await expect(
        authService.signup('azerty@example.com', 'awesome'),
      ).rejects.toThrow(new BadRequestException('Email in use'));
    });
  });

  describe('signin', () => {
    it('throws if signin is called with an unused email', async () => {
      await expect(
        authService.signin('azerty@example.com', 'awesome'),
      ).rejects.toThrow(new BadRequestException('User not found'));
    });

    it('throws if invalid password is provided', async () => {
      fakeUsersService.find = () =>
        Promise.resolve([
          {
            id: 1,
            email: 'azerty@example.com',
            password: 'shouldBeTheHashedPasswordVersion',
          } as User,
        ]);

      await expect(
        authService.signin('azerty@example.com', 'awesome'),
      ).rejects.toThrow(new BadRequestException('Bad password'));
    });

    it('returns an user if correct password is provided', async () => {
      // Call the signup method to view the generate version of an hash for tests comparison
      // const toto = await authService.signup('azerty@example.com', 'awesome');
      // console.log(toto.password);
      fakeUsersService.find = () =>
        Promise.resolve([
          {
            id: 1,
            email: 'azerty@example.com',
            password:
              '9bc1b4b42ad2eb9d.d052097b04fba6220ce915d0ca58f163847aa695f740a8258fc80a92021762d4',
          } as User,
        ]);

      const user = await authService.signin('azerty@example.com', 'awesome');
      expect(user).toBeDefined();
    });
  });
});
