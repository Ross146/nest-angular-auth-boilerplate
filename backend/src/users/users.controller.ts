import { Body, Controller, Get } from '@nestjs/common';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('createUser')
  async createUser(
    @Body() user: UserCreateDto,
  ): Promise<Omit<UserDto, 'password'>> {
    return await this.usersService.addUser(user);
  }
}
