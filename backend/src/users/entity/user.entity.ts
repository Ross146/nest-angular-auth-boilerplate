import {Entity, ObjectID, ObjectIdColumn, Column} from "typeorm";

@Entity()
export default class User {

  @ObjectIdColumn()
  id: ObjectID;

  @Column(
    {
      nullable: false
    }
  )
  username: string;

  @Column({
    nullable: false,
    unique: true
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;
}
