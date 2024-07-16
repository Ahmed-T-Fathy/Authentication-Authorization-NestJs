import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  // to be accessabel outside the module
  exports:[UsersService]
})
export class UsersModule {}
