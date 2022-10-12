export const emailLogInSchema = {
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
        maxLength: 64,
      },
    },
    required: ["email", "password"],
    additionalProperties: false,
  },
};
