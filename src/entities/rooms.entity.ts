import { Entity, Column, PrimaryGeneratedColumn, Generated, BeforeInsert, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class Rooms {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({
    'nullable': false,
  })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      console.log(error);
    }
  }
 
}