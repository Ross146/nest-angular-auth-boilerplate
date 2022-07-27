import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { UserEntity } from 'src/users/entity/user.entity';

@Entity('avatar')
export class AvatarEntity {
  @PrimaryGeneratedColumn() id: string;
  @Column({ type: 'varchar' }) avatar: string;
  @OneToOne((type) => UserEntity) @JoinColumn() user: UserEntity;
}
