import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import api from "../../axios/api";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await api.post("/auth/login", {
            email: credentials?.email,
            password: credentials?.password,
          });

          const { id, username, email, token, role } = response.data;

          if (token) {
            return {
              id: id.toString(),
              username: username?.toString(),
              email: email?.toString(),
              accessToken: token.toString(),
              role: role?.toString(),
            };
          }

          return null;
        } catch (error) {
          console.error("Erro ao fazer login:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.username = user.username as string;
        token.email = user.email as string;
        token.accessToken = user.accessToken as string;
        token.role = user.role as string;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        username: token.username as string,
        email: token.email as string,
        role: token.role as string,
      };
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
};
