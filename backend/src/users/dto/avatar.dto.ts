import { IsNotEmpty } from 'class-validator';

export class AvatarDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  avatar: string;
}
