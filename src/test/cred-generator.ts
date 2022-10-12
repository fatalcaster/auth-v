export class FakeCreds {
  static email() {
    const user = (Math.random() + 1).toString(36).substring(7);
    const email = `${user}@test.com`;
    return email;
  }
  static password() {
    let password = "Password123";

    return password;
  }
}
