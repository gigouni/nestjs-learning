import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from './user.entity';

// scrypt is an inner Node.js module but still provides a callback response
// promisify allows to use Promises syntax instead
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string): Promise<User> {
    const users = await this.usersService.find(email);
    if (users?.length) {
      throw new BadRequestException('Uemail in use');
    }

    // Hash the users password
    //      Generate a salt
    //      Each bytes will generates two characters within the salt
    const salt = randomBytes(8).toString('hex');

    //      Hash the salt and the password together
    //      The crypto lib does not provide typed methods, force the inference to the Buffer type
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //      Join the hashed result and the salt together
    const result = `${salt}.${hash.toString('hex')}`;

    // Create a new user and save it
    // Return the user
    return this.usersService.create(email, result);
  }

  signin() {
    // ...
  }
}
