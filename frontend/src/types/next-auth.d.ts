import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: {
      id?: string;
      username?: string;
      name?: string;
      email?: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    accessToken?: string;
    role?: string;
    username?: string;
  }

  interface JWT {
    accessToken?: string;
    id?: string;
    username?: string;
    email?: string;
    role?: string;
  }
}
