import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { loginQuery } from "@/lib/query/hasuraQuery";
import * as jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials: any): Promise<any> {
                try {
                    const hasuraEndPoint = process.env.HASURA_PROJECT_ENDPOINT as string;

                    // Fetch all the user data from the server
                    const { data: result }: any = await axios.post(
                        hasuraEndPoint,
                        loginQuery,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
                            },
                        }
                    );

                    // Find the user by email address
                    const isUserExist = result.data.users.find(
                        (user: any) => user.email === credentials.email
                    );

                    if (!isUserExist) {
                        throw new Error("User not found!");
                    }

                    // Match the given password with the stored password
                    const passwordMatched = await bcrypt.compare(credentials.password, isUserExist.password);

                    if (!passwordMatched) {
                        throw new Error("Incorrect password");
                    }

                    return {
                        email: isUserExist.email,
                        id: isUserExist.user_id,
                        name: isUserExist.username
                    };
                } catch (error: any) {
                    console.error("Error in authorize function:", error.message);
                    throw new Error(error.message || "Authentication failed");
                }
            },
        }),
    ],
    pages: {
        signIn: '/login'
    },
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        encode: ({ secret, token }) => {
            const encodedToken = jsonwebtoken.sign(token!, secret, {
                algorithm: "HS512",
            });
            return encodedToken;
        },
        decode: async ({ secret, token }) => {
            const decodedToken = jsonwebtoken.verify(token!, secret, {
                algorithms: ["HS512"],
            });
            return decodedToken as JWT;
        },
    },
    callbacks: {
        async jwt({ token, user }) {
            return {
                ...token,
                ...user,
                "https://hasura.io/jwt/claims": {
                    "x-hasura-allowed-roles": ["user", "admin"],
                    "x-hasura-default-role": "user",
                    "x-hasura-role": "user",
                    "x-hasura-user-id": token.sub,
                },
            };
        },
        session: async ({ session, token }: any) => {
            try {
                const encodedToken = jsonwebtoken.sign(token, process.env.NEXTAUTH_SECRET as string, {
                    algorithm: "HS512",
                });
                
                    session.user.id = token.sub!;
                    session.user.name= token.name;
                    session.accessToken = encodedToken;

                
                return session;
            } catch (error: any) {
                console.error("Error in session callback:", error.message);
                throw new Error("Session handling failed");
            }
        },
    },
};
