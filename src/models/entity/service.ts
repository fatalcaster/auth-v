import { Entity, Column, OneToMany } from "typeorm";
import { PasswordRequirement } from "../../helpers/cred-helper";
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
    default: AuthMethod.session,
  })
  authMethod?: AuthMethod;

  @Column({
    nullable: false,
    type: "enum",
    enum: PasswordRequirement,
    default: PasswordRequirement.includeNumbers,
  })
  passwordRequirement?: PasswordRequirement;

  @OneToMany((_type) => User, (user) => user.service, { cascade: true })
  users?: User[];
}
