import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Gender {
  Male = 0,
  Female = 1,
  Other = 2,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  firstName: string;

  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  @Column({ type: 'smallint', unsigned: true })
  age: number;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.Other,
  })
  gender: Gender;

  @Column({ type: 'boolean' })
  issues: boolean;
}
