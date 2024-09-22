// import axios from "axios";
// import NextAuth from "next-auth";
// import Providers from "next-auth/providers";

// interface Credentials {
//   username: string;
//   email: string;
//   password: string;
// }

// export default NextAuth({
//   providers: [
//     Providers.Credentials({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text", placeholder: "Username" },
//         email: { label: "Email",type: "email",placeholder: "Email" },
//         password: { label: "Password", type: "password", placeholder: "Password" }
//       },
//       authorize: async (credentials: Credentials) => {
//         const response = await axios.post(
//           "http://localhost:8000/api/v1/user/customer/signin",
//           credentials,
//           {withCredentials: true}
//         );
//         const data = await response.data;

//         if (data.success) {
//           return {
//             id: data.user.id,
//             name: data.user.username,
//             email: data.user.email,
//           };
//         } else {
//           return null;
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/auth/signin",
//   },
//   callbacks: {
//     async signIn({ user, account, profile, email, credentials }) {
//       return true;
//     },
//     async jwt({ token, user }) {
//         if (user) {
//           token.id = user.id;
//           token.username = user.username;
//         }
//         return token;
//     },
//     async session({ session, token }) {
//         session.id = token.id;
//         session.username = token.username;
//         return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET
// });