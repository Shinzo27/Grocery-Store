import axios from "axios";
import NextAuth from "next-auth/next"; 
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            authorize: async (credentials) => {
                const { data } = await axios.post('http://localhost:8000/api/v1/user/admin/signin', { email: credentials?.email, password: credentials?.password }, { withCredentials: true });
                if(data.success){
                    return {
                        id: data.user.id,
                        name: data.user.username,
                        email: data.user.email,
                    }
                }
                else{
                    return null;
                }
            }
        }),
    ] 
});