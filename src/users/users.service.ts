import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      email: 'john@test.com',
      password:
        'e7828c0cc10539d2.a185d006dfc686c1b073e7aebd7495bc20cd5666b9e7f58e5c04d3e1a3a867cb',
    },
    {
      userId: 2,
      email: 'maria@test.com',
      password:
        'e7828c0cc10539d2.a185d006dfc686c1b073e7aebd7495bc20cd5666b9e7f58e5c04d3e1a3a867cb',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
