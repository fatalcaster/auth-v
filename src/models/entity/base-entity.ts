import {
  BaseEntity as BaseBaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from "typeorm";
import { ID } from "../../helpers/ID";

class CustomBaseEntity extends BaseBaseEntity {
  constructor() {
    super();
    this.id = ID.generate();
  }
  @PrimaryColumn("uuid", { default: ID.generate() })
  id!: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  public updated_at: Date;
}

// Removes all CustomBaseEntity props from a basic entity type
type RequiredEntityProps<
  T extends CustomBaseEntity,
  K extends keyof CustomBaseEntity | keyof T = "id"
> = Omit<T, keyof CustomBaseEntity | K>;

export { CustomBaseEntity, RequiredEntityProps };
