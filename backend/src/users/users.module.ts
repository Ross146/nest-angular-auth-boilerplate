import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UserEntity } from './entity/user.entity';
import { AvatarEntity } from 'src/users/entity/avatar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AvatarEntity])],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
