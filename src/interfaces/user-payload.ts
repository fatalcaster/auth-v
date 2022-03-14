export class UserPayload {
  id: string;
  email: string;
  permission: Permissions;
  public static build(data: UserPayload): UserPayload {
    return {
      id: data.id,
      email: data.email,
      permission: data.permission,
    };
  }
}

export enum Permissions {
  None = "none",
  Basic = "basic",
  Admin = "admin",
  SuperAdmin = "super:admin",
}

export enum AuthMethod {
  jwt = "jwt",
}
