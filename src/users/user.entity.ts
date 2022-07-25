import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  BeforeRemove,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

// By refering to other conventions, we should be naming it UserEntity
// BUT, by community conventions, the entities are the only ones allowed to remove the `Entity` suffix
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude() // Exclude the password from the outgoing responses with @UseInterceptors(ClassSerializerInterceptor) on controller method
  password: string;

  @AfterInsert()
  logInsert() {
    console.log(`Inserted user with ID ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated user with ID ${this.id}`);
  }

  @BeforeRemove()
  logBeforeRemove() {
    console.log(`Removing user with ID ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    // Due to deleted instance, the id won't be found after the remove
    // Use the `BeforeRemove()` hook instead
    console.log(`Removed user with ID ${this.id}`);
  }
}
