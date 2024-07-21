import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/signin.dto';
import { AuthGaurd } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from './roles.enum';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  signIn(@Body() signInDto: SignInDto) {
    const { email, password } = signInDto;
    return this.authService.signIn(email, password);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGaurd)
  @Get('profile')
  getProfile(@Request() req) {
    // console.log(req);

    return req.user;
  }
}
