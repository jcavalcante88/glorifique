import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Resend from "next-auth/providers/resend";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import { users, accounts, sessions, verificationTokens } from "@/db/schema";

const admins = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    Google,
    GitHub,
    Resend({ from: process.env.EMAIL_FROM }),
  ],
  // JWT: a sessão fica num cookie criptografado (httpOnly, secure, sameSite=lax)
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 }, // 7 dias
  pages: {
    signIn: "/entrar",
    verifyRequest: "/entrar/verifique",
    error: "/entrar",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id;
      token.role = admins.includes((token.email || "").toLowerCase()) ? "admin" : "membro";
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
});
