export class UserPayload {
  id: string;
  email: string;
  serviceId?: string;
  permission: Permission;
  public static build(data: UserPayload): UserPayload {
    return {
      id: data.id,
      email: data.email,
      permission: data.permission,
      ...(data.serviceId && { serviceId: data.serviceId }),
    };
  }
}

export enum Permission {
  None = "none",
  Basic = "basic",
  Admin = "admin",
  SuperAdmin = "super:admin",
}

export enum AuthMethod {
  jwt = "jwt",
  session = "session",
}
