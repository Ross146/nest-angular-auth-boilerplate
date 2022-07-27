import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from 'src/users/entity/user.entity';
import { ChatEntity } from 'src/chat/entity/chat.entity';

@Entity('message')
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid') id: string;
  @OneToOne((type) => UserEntity) @JoinColumn() author: UserEntity;
  @OneToOne((type) => ChatEntity) @JoinColumn() chat: ChatEntity;
  @Column({ type: 'varchar', nullable: false }) message: string;
  @CreateDateColumn() createdOn?: Date;
  @UpdateDateColumn() updatedOn?: Date;
}
