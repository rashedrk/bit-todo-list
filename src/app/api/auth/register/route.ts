import axios from "axios";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { email, password, username } = await req.json();

    if (!email || !password || !username) {
        return NextResponse.json({
            success: false,
            statusCode: httpStatus.UNPROCESSABLE_ENTITY,
            message: "Invalid email, password, or username",
        }, { status: httpStatus.UNPROCESSABLE_ENTITY });
    }

    const hasuraEndPoint: string = process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT as string;
    const hasuraSecret = process.env.HASURA_ADMIN_SECRET;

    try {
        // Get all user email addresses
        const { data: result } = await axios.post(
            hasuraEndPoint,
            {
                query: `
                    query GetAllUsers {
                        users {
                            email
                        }
                    }
                `,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-hasura-admin-secret": hasuraSecret,
                },
            }
        );

        const isEmailExists = result.data.users.find((user: any) => user.email === email);
        if (isEmailExists) {
            return NextResponse.json({
                success: false,
                statusCode: httpStatus.UNPROCESSABLE_ENTITY,
                message: "Email already exists",
            }, { status: httpStatus.UNPROCESSABLE_ENTITY });
        }

        // Hashing password using bcrypt
        const hashedPassword = bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS));

        // Users registration information
        const { data } = await axios.post(
            hasuraEndPoint,
            {
                query: `
                    mutation RegisterUser {
                        insert_users_one(object: {email: "${email}", password: "${hashedPassword}", username: "${username}"}) {
                            email
                        }
                    }
                `,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-hasura-admin-secret": hasuraSecret,
                },
            }
        );

        if (data.errors) {
            throw new Error(data.errors[0].message);
        }

        return NextResponse.json({
            success: true,
            statusCode: httpStatus.CREATED,
            data: data,
        }, { status: httpStatus.CREATED });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message || "Internal server error",
        }, { status: httpStatus.INTERNAL_SERVER_ERROR });
    }
}
