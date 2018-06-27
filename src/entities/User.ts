import { IsEmail } from "class-validator";
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
class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text", nullable: true, unique: true })
  @IsEmail()
  email: string | null;

  @Column({ type: "text" })
  firstName: string;

  @Column({ type: "text" })
  lastName: string;

  @Column({ type: "text", nullable: true })
  bio: string | null;

  @Column({ type: "text", nullable: true })
  location: string | null;

  @Column({ type: "text" })
  profilePhoto: string;

  @Column({ type: "text" })
  fbUserId: string;

  @OneToMany(type => DeskPic, deskPic => deskPic.user)
  deskPics: DeskPic[];

  @Column({ type: "boolean", default: false })
  isAdmin: boolean;

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
export default User;
