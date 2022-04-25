import * as bcrypt from 'bcrypt';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { AvatarCreateDto } from 'src/users/dto/avatarCreate.dto';
import { AvatarDto } from 'src/users/dto/avatar.dto';
import { AvatarEntity } from 'src/users/entity/avatar.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AvatarEntity)
    private readonly avatarRepository: Repository<AvatarEntity>,
  ) {}

  async findOne(email: string): Promise<UserDto> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      return {
        id: user.id.toString(),
        username: user.username,
        password: user.password,
        email: user.email,
      };
    }
  }

  async addUser(user: UserCreateDto): Promise<Omit<UserDto, 'password'>> {
    const { username, password, email } = user;

    // check if the user exists in the db
    const userInDb = await this.userRepository.findOne({
      where: { username },
    });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userToSave: UserEntity = await this.userRepository.create({
      username,
      password: hashedPassword,
      email,
    });
    const savedUser = await this.userRepository.save(userToSave);

    return {
      id: savedUser.id.toString(),
      username: savedUser.username,
      email: savedUser.email,
    };
  }

  async addAvatar({ userId, avatar }: AvatarCreateDto): Promise<AvatarDto> {
    const userInDb = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!userInDb) {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }

    const avatarInDb = await this.avatarRepository.findOne({
      where: { user: userInDb },
    });

    if (avatarInDb) {
      await this.avatarRepository.update(
        { user: userInDb },
        {
          avatar: avatar,
        },
      );
    } else {
      const avatarToSave: AvatarEntity = await this.avatarRepository.create({
        user: userInDb,
        avatar: avatar,
      });

      const savedAvatar = await this.avatarRepository.save(avatarToSave);

      return {
        avatar: savedAvatar.avatar,
        userId: savedAvatar.user.id,
        id: savedAvatar.id,
      };
    }
  }
}
