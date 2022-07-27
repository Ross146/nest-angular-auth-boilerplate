import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { UserCreateDto } from '../users/dto/userCreate.dto';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() user: UserCreateDto) {
    return this.userService.addUser(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getUser')
  async hello(@Request() req) {
    return req.user;
  }
}
