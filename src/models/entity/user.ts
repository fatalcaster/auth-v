import { Entity, Column, ManyToOne } from "typeorm";
import { Permission } from "../../interfaces/user-payload";
import { CustomBaseEntity } from "./base-entity";
import { Service } from "./service";

@Entity()
export class User extends CustomBaseEntity {
  @Column({ nullable: false })
  email!: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: false, default: false })
  verified?: boolean;

  @Column({
    nullable: false,
    type: "enum",
    enum: Permission,
    default: Permission.Basic,
  })
  permission?: Permission;

  @ManyToOne((_type) => Service, (service) => service.users, {
    onDelete: "CASCADE",
  })
  service: Service;
}
