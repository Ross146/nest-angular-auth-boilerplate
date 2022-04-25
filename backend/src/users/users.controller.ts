import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AvatarCreateDto } from 'src/users/dto/avatarCreate.dto';
import { UsersService } from './users.service';
import { AvatarDto } from 'src/users/dto/avatar.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('avatar')
  async addUserAvatar(
    @Body() avatarData: Omit<AvatarCreateDto, 'userId'>,
    @Request() req,
  ): Promise<AvatarDto> {
    return await this.usersService.addAvatar({
      userId: req.user.userId,
      avatar: avatarData.avatar,
    });
  }
}
