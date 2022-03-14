import { Entity, Column, ManyToOne } from "typeorm";
import { CustomBaseEntity } from "./base-entity";
import { Service } from "./service";

@Entity()
export class User extends CustomBaseEntity {
  @Column({ nullable: false })
  email!: string;

  @Column({ nullable: true })
  password?: string;

  @ManyToOne((_type) => Service, (service) => service.users, {
    onDelete: "CASCADE",
  })
  service: Service;
}
