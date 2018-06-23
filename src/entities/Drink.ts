import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import DeskPic from "./DeskPic";

@Entity()
class Drink extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @OneToMany(type => DeskPic, deskPic => deskPic.drink)
  deskPics: DeskPic[];

  @Column({ type: "text" })
  name: string;

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;
}
export default Drink;
