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
            username: credentials?.email,
            password: credentials?.password,
          });

          const { token } = response.data;

          if (typeof token === "string") {
            // Assegura que token é uma string
            return {
              id: "1", // Placeholder
              name: "Default User", // Placeholder
              email: credentials?.email,
              accessToken: token,
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
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (typeof token.accessToken === "string") {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
};
