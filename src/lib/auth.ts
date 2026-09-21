import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { admin } from "better-auth/plugins";

import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mysql",
  }),

  emailAndPassword: {
    enabled: true,
  },

  plugins: [
    admin(),
  ],

  trustedOrigins: [
    process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  ],
});