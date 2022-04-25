import { IsNotEmpty } from 'class-validator';

export class CreateMessage {
  @IsNotEmpty()
  chatId: string;

  @IsNotEmpty()
  authorId: string;

  @IsNotEmpty()
  message: string;
}
