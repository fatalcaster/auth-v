import { ValidationErrorTemplate } from "../interfaces/validation-error-template";

export enum PasswordRequirement {
  pin,
  includeNumbers,
  includeUppercase,
  includeSpecialCharacters,
}

function isValidPassword(
  str: string,
  requirement: PasswordRequirement,
  minLen: number,
  maxLen?: number | undefined
) {
  if (!str || typeof str !== "string") return false;
  if (str.length < minLen || (maxLen && str.length > maxLen)) return false;
  switch (requirement) {
    case PasswordRequirement.pin:
      return !(
        str.match(
          new RegExp(String.raw`^([0-9]{${minLen},${maxLen || ""}})$`)
        ) === null
      );
    case PasswordRequirement.includeNumbers:
      return !(
        str.match(
          new RegExp(
            String.raw`^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{${minLen},${
              maxLen || ""
            }}$`
          )
        ) === null
      );
    case PasswordRequirement.includeUppercase:
      return !(
        str.match(
          new RegExp(
            String.raw`^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{${minLen},${
              maxLen || ""
            }}$`
          )
        ) === null
      );
    case PasswordRequirement.includeSpecialCharacters:
      return !(
        str.match(
          new RegExp(
            String.raw`^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{${minLen},${
              maxLen || ""
            }}$`
          )
        ) === null
      );
  }
}
export function isValidEmail(str: string): Boolean {
  if (!str || typeof str !== "string") return false;
  const res = str
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  if (!res) return false;
  return true;
}

export const emailValidator = (email: string) => {
  if (!isValidEmail(email)) {
    return [new ValidationErrorTemplate("email", "Invalid Email")];
  }
  return [];
};

export const passwordValidator = (
  password: string,
  requirement: PasswordRequirement,
  minLen: number,
  maxLen?: number
) => {
  if (!isValidPassword(password, requirement, minLen, maxLen)) {
    return [new ValidationErrorTemplate("password", "Invalid Password")];
  }
  return [];
};
