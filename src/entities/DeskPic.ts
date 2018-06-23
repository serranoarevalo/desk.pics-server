import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import Drink from "./Drink";
import User from "./User";

interface ICoords {
  lat: number;
  lng: number;
}

@Entity()
class DeskPic extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(type => User, user => user.deskPics)
  user: User;

  @Column({ nullable: true })
  drinkId: number;

  @ManyToOne(type => Drink, drink => drink.deskPics)
  drink: Drink;

  @Column({ type: "text" })
  photoUrl: string;

  @Column({ type: "json" })
  locationLat: ICoords;

  @Column({ type: "text" })
  locationName: string;

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;
}
export default DeskPic;
