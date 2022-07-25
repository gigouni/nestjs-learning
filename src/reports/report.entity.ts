import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// By refering to other conventions, we should be naming it ReportEntity
// BUT, by community conventions, the entities are the only ones allowed to remove the `Entity` suffix
@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;
}