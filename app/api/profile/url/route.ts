import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";

export const GET = async (request: NextRequest) => {
    try {
        const searchParams = request.nextUrl.searchParams;
        const userId = Number(searchParams.get('userId'));

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                firstName: true,
                lastName: true
            }
        })

        const profileUrl = `${process.env.NEXT_PUBLIC_URL}/p/${user?.firstName.toLowerCase()}-${user?.lastName.toLowerCase()}-${userId}`;

        return NextResponse.json({ profileUrl });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message });
    }
}