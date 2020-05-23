import { Entity, Column, PrimaryGeneratedColumn, Generated, BeforeInsert, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Users } from './users.entity';


@Entity()
export class Rooms {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({
    'nullable': false,
  })
  password: string;

  @Column()
  userId: number;

  @ManyToOne(type => Users)
  @JoinColumn()
  user: Users;

  @BeforeInsert()
  async hashPassword() {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      console.log(error);
    }
  }
 
}