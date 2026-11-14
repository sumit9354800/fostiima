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
    // Accounts are admin-only and created by an existing admin; the public
    // sign-up endpoint stays closed. Existing users sign in as before.
    disableSignUp: true,
  },

  plugins: [admin()],

  baseURL: {
    allowedHosts: [
      "fostiima.org",
      "www.fostiima.org",
      "*.vercel.app",
    ],
    protocol: "https",
    fallback: "https://fostiima.org",
  },

  trustedOrigins: [
    "http://localhost:3000",
    "https://fostiima.org",
    "https://www.fostiima.org",
  ],
});