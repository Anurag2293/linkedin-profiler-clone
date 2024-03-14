import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";

export const POST = async (request: NextRequest) => {
    try {
        const { about, userId } = await request.json();

        const newAbout = await prisma.about.create({
            data: {
                about
            }
        })

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                about: {
                    connect: {
                        id: newAbout.id
                    }
                }
            }
        })

        return NextResponse.json({ about: newAbout })
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message });
    }
}

export const PUT = async (request: NextRequest) => {
    try {
        const { id, about } = await request.json();
        const updatedAbout = await prisma.about.update({
            where: {
                id
            },
            data: {
                about
            }
        })

        return NextResponse.json({ about: updatedAbout });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message });
    }
}

export const DELETE = async (request: NextRequest) => {
    try {
        const { id } = await request.json();
        const deletedAbout = await prisma.about.delete({
            where: {
                id
            }
        })

        return NextResponse.json({ about: deletedAbout });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message });
    }
}