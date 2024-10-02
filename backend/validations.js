const { z } = require("zod");

const signupBody = z.object({
  email: z.string().email().min(7).max(20),
  password: z.string().min(8).max(20),
  firstName: z.string().min(2).max(20),
  lastName: z.string().min(2).max(20),
});

const signinBody = z.object({
  email: z.string().email().min(7).max(20),
  password: z.string().min(8).max(20),
});

module.exports = {
  signinBody,
  signupBody,
};
