import { Entity, Column, OneToMany } from "typeorm";
import { AuthMethod } from "../../interfaces/user-payload";
import { CustomBaseEntity } from "./base-entity";
import { User } from "./user";

@Entity()
export class Service extends CustomBaseEntity {
  @Column({ nullable: false, unique: true })
  email!: string;

  @Column({ nullable: true })
  password?: string;

  @Column({
    nullable: false,
    type: "enum",
    enum: AuthMethod,
    default: AuthMethod.jwt,
  })
  authMethod?: AuthMethod;

  @OneToMany((_type) => User, (user) => user.service, { cascade: true })
  users?: User[];
}
