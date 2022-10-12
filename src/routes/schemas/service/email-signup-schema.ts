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
        maxLength: 64,
      },
    },
    required: ["email", "password"],
    additionalProperties: false,
  },
  response: {
    default: {
      type: "object",
      properties: {
        error: {
          type: "boolean",
          default: true,
        },
      },
    },
    "201": {
      properties: {
        id: { type: "string" },
        email: { type: "string" },
        serviceId: { type: "string" },
      },
      required: ["id", "email"],
      additionalProperties: false,
    },
  },
};
