import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";

export const GET = async (request: NextRequest) => {
    try {
        const searchParams = request.nextUrl.searchParams;
        const userId = Number(searchParams.get('userId'));

        const userWithSkills = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                skills: true
            }
        })
        const userSkills = userWithSkills?.skills;

        return NextResponse.json({ skills: userSkills })
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message })
    }
}


export const POST = async (request: NextRequest) => {
    try {
        const { name, userId } = await request.json();
        const newSkill = await prisma.skill.create({
            data: {
                name
            }
        })

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                skills: {
                    connect: {
                        id: newSkill.id
                    }
                }
            }
        })

        return NextResponse.json({ skill: newSkill });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message });
    }
}

export const PUT = async (request : NextRequest) => {
    try {
        const { id, name } = await request.json();
        const updatedSkill = await prisma.skill.update({
            where: {
                id
            },
            data: {
                name
            }
        })

        return NextResponse.json({ skill: updatedSkill });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message });
    }
}

export const DELETE = async (request: NextRequest) => {
    try {
        const { id } = await request.json();
        const deletedSkill = await prisma.skill.delete({
            where: {
                id
            }
        })

        return NextResponse.json({ skill: deletedSkill });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message });
    }
}