import { PasswordRequirement, passwordValidator } from "../cred-helper";

it("returns an error for an empty string", async () => {
  const err = passwordValidator("", PasswordRequirement.pin, 4);
  expect(err.length).not.toEqual(0);
  expect(err[0].params).toEqual("password");
  expect(err[0].msg).toEqual("Invalid Password");
});

it("returns an error for for a not long enough string", async () => {
  const err = passwordValidator("243", PasswordRequirement.pin, 4);
  expect(err.length).not.toEqual(0);
  expect(err[0].params).toEqual("password");
  expect(err[0].msg).toEqual("Invalid Password");
});

it("returns no errors for a valid pin", async () => {
  const err = passwordValidator("2434", PasswordRequirement.pin, 4);
  expect(err.length).toEqual(0);
});

it("returns an error when pin is entered but letters expected", async () => {
  const err = passwordValidator("2434", PasswordRequirement.includeNumbers, 4);
  expect(err.length).not.toEqual(0);
  expect(err[0].params).toEqual("password");
  expect(err[0].msg).toEqual("Invalid Password");
});

it("returns no errors when password with numbers and letters is entered", async () => {
  const err = passwordValidator(
    "password123",
    PasswordRequirement.includeNumbers,
    8
  );
  expect(err.length).toEqual(0);
});

it("returns no errors when password with numbers and uppercase letters is entered", async () => {
  const err = passwordValidator(
    "Password123",
    PasswordRequirement.includeUppercase,
    8
  );
  expect(err.length).toEqual(0);
});

it("returns an error when a special character is required  but not provided", async () => {
  const err = passwordValidator(
    "Password123",
    PasswordRequirement.includeSpecialCharacters,
    8
  );
  expect(err.length).toEqual(1);
});

it("returns no errors when a password with special character uppercase letters and numbers is provided", async () => {
  const err = passwordValidator(
    "Password123@",
    PasswordRequirement.includeSpecialCharacters,
    8
  );
  expect(err.length).toEqual(0);
});
