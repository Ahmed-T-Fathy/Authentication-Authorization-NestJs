import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { randomBytes, scrypt as _scrypt, Verify } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    const [salt, oldPassword] = user.password.split('.');
    const hash = (await scrypt(pass, salt, 32)) as Buffer;

    if (oldPassword !== hash.toString('hex')) {
      throw new UnauthorizedException();
    }

    const paylod = { userId: user.userId };

    console.log(user);

    return {
      access_token: await this.jwtService.signAsync(paylod),
    };
  }
}
