import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import { pages } from "next/dist/build/templates/app-page";

export const NEXT_AUTH = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Username"},
                password: { label: "Password", type: "password", placeholder: "Password"}
            },
            async authorize(credentials: any) {
                console.log("authorize called", credentials);
                // const { data } = await axios.post(
                //     "http://localhost:8000/api/v1/user/admin/signin",
                //     { email: credentials?.email, password: credentials?.password },
                //     { withCredentials: true },
                //   );
                //   if (data.success) {
                //     console.log("Successful");
                //     return {
                //       id: data.user.id,
                //       name: data.user.username,
                //       email: data.user.email,
                //     };
                //   } else {
                //     console.log("Failed!");
                //     return null;
                //   }
                return {
                    id: "user1",
                    name: "asd",
                    userId: "asd",
                    email: "ramdomEmail"
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        session: ({ session, token, user} : any) => {
            if( session && session.user ) {
                session.user.id = token.userId
            }
            return session
        }
    },
    pages: {
        signIn: "/auth/signin",
    }
}