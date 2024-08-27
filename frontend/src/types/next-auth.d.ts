import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: {
      id?: string;
      name?: string;
      email?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    accessToken?: string;
  }

  interface JWT {
    accessToken?: string;
  }
}
