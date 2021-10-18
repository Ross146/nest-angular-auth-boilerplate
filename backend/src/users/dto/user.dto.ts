import {IsNotEmpty, IsEmail} from "class-validator";

export class UserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
