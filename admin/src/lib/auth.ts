import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import { pages } from "next/dist/build/templates/app-page";

export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials: any) {
        try {
          const { data } = await axios.post(
            "http://localhost:8000/api/v1/user/admin/signin",
            { email: credentials?.email, password: credentials?.password },
            { withCredentials: true },
          );
          if (data.success) {
            return {
              id: data.user.id,
              name: data.user.username,
              email: data.user.email,
            };
          } else {
            return null;
          }
        } catch (error) {
            return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: ({ session, token, user }: any) => {
      if (session && session.user) {
        session.user.id = token.userId;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};
