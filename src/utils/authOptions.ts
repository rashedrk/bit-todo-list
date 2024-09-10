import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { loginQuery } from "@/lib/query/hasuraQuery";
import * as jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
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
                    };
                } catch (error: any) {
                    console.error("Error in authorize function:", error.message);
                    throw new Error(error.message || "Authentication failed");
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        encode: ({ secret, token }) => {
            const encodedToken = jsonwebtoken.sign(token!, secret, {
                algorithm: "HS256",
            });
            return encodedToken;
        },
        decode: async ({ secret, token }) => {
            const decodedToken = jsonwebtoken.verify(token!, secret, {
                algorithms: ["HS256"],
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
                    "x-hasura-default-role": token.role,
                    "x-hasura-role": token.role,
                    "x-hasura-user-id": token.sub,
                },
            };
        },
        session: async ({ session, token }: any) => {
            try {
                const encodedToken = jsonwebtoken.sign(token, process.env.NEXTAUTH_SECRET as string, {
                    algorithm: "HS256",
                });
                if (session?.user) {
                    session.user.id = token.sub!;
                    session.user.role = token.role!;
                    session.accessToken = encodedToken;
                }
                return session;
            } catch (error: any) {
                console.error("Error in session callback:", error.message);
                throw new Error("Session handling failed");
            }
        },
    },
};
