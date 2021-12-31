import * as bcrypt from 'bcrypt';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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
}
