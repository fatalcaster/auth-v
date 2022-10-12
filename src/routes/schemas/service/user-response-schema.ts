export const emailSignUpSchema = {
  body: {
    type: "object",
    properties: {
      email: {
        type: "string",
        minLength: 6,
        maxLength: 127,
        format: "email",
      },
      password: {
        type: "string",
        pattern: "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$",
        maxLength: 64,
      },
    },
    required: ["email", "password"],
    additionalProperties: false,
  },
};
