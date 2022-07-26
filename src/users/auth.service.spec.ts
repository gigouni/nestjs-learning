import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let authService: AuthService;
  const fakeUsersService = {
    find: () => Promise.resolve([]),
    create: (email: string, password: string) =>
      Promise.resolve({ id: 1, email, password }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        // Mocks the Dependency Injection Container content for the UsersService usage
        { provide: UsersService, useValue: fakeUsersService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('create an instance of auth service', () => {
    expect(authService).toBeDefined();
  });
});
