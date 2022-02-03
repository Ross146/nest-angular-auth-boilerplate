import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserDto } from './dto/user.dto';
import { AvatarCreateDto } from 'src/users/dto/avatarCreate.dto';
import { UsersService } from './users.service';
import { AvatarDto } from 'src/users/dto/avatar.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('createUser')
  async createUser(
    @Body() user: UserCreateDto,
  ): Promise<Omit<UserDto, 'password'>> {
    return await this.usersService.addUser(user);
  }

  @Post('addAvatar')
  async addUserAvatar(@Body() avatarData: AvatarCreateDto): Promise<AvatarDto> {
    return await this.usersService.addAvatar(avatarData);
  }
}
