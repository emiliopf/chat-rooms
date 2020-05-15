import { Entity, Column, PrimaryGeneratedColumn, Generated, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Entity()
export class Rooms {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({
    'nullable': true,
  })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    try {
      console.log(this.password);
      this.password = await bcrypt.hash(this.password, 10);
      //this.password = 'nessd';
    } catch (error) {
      console.log(error);
    }
  }
 
}