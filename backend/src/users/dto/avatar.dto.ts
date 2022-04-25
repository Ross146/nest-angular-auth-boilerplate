import { IsNotEmpty } from 'class-validator';

export class AvatarDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  avatar: string;
}
