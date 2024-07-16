import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [UsersModule, JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: (config:ConfigService) => {
      return {
        global: true,
        secret: config.get<string>('jwt_secret'),
        signOptions:{expiresIn:'1h'}
      };
    }
  })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
