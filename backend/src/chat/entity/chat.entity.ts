import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('chat')
export class ChatEntity {
  @PrimaryGeneratedColumn('uuid') id: string;
  @CreateDateColumn() createdOn?: Date;
  @UpdateDateColumn() updatedOn?: Date;
}
