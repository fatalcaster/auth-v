import {
  v4 as uuidv4,
  validate as uuidValidate,
  version as uuidVersion,
} from "uuid";

export class ID {
  static generate() {
    return uuidv4();
  }
  static isValid(id: any) {
    if (typeof id !== "string") {
      return false;
    }
    return uuidValidate(id) && uuidVersion(id) === 4;
  }
}
