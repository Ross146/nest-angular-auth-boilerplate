import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/dto/user.dto';
import { UserCreateDto } from '../users/dto/userCreate.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<UserDto, 'password'>> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      return null;
    }
    const isValidPassword = await bcrypt.compare(pass, user.password);
    if (isValidPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserDto) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signIn(user: UserCreateDto): Promise<Omit<UserDto, 'password'>> {
    return this.usersService.addUser(user);
  }
}
