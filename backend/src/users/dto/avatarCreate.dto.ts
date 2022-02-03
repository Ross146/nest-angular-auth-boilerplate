import { IsNotEmpty } from 'class-validator';

export class AvatarCreateDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  avatar: string;
}
