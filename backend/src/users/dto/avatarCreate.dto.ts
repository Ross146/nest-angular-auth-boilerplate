import { IsNotEmpty, IsUUID } from 'class-validator';

export class AvatarCreateDto {
  @IsNotEmpty()
  @IsUUID(4)
  userId: string;

  @IsNotEmpty()
  avatar: string;
}
