import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";

export const GET = async (request: NextRequest) => {
    try {
        const searchParams = request.nextUrl.searchParams;
        const userId = Number(searchParams.get('userId'));

        let experiences;
        if (userId) {
            experiences = await prisma.experience.findMany({
                where: {
                    userId
                }
            });
        } else {
            experiences = await prisma.experience.findMany({});
        }
        return NextResponse.json({ experiences })
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message })
    }
}

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const { 
            title, 
            employmentType,
            companyName, 
            location,
            locationType,
            startMonth, 
            startYear, 
            endMonth, 
            endYear, 
            description,
            userId,
        } = body;

        const newExperience = await prisma.experience.create({
            data: {
                title,
                employmentType,
                companyName,
                location,
                locationType,
                startMonth,
                startYear,
                endMonth: endMonth || "PRESENT",
                endYear: endYear || null,
                description
            }
        })

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                experiences: {
                    connect: {
                        id: newExperience.id
                    }
                }
            }
        })

        return NextResponse.json({ experience: newExperience });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message });
    }
}


export const PUT = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const { 
            id,
            title, 
            employmentType,
            companyName, 
            location,
            locationType,
            startMonth, 
            startYear, 
            endMonth, 
            endYear, 
            description,
        } = body;

        const experience = await prisma.experience.findUnique({
            where: {
                id
            }
        })

        if (!experience) {
            return NextResponse.json({ error: "Experience not found!" });
        }

        const updatedExpObject = {
            title: title || experience.title,
            employmentType: employmentType || experience.employmentType,
            companyName: companyName || experience.companyName,
            location: location || experience.location,
            locationType: locationType || experience.locationType,
            startMonth: startMonth || experience.startMonth,
            startYear: startYear || experience.startYear,
            endMonth: endMonth || experience.endMonth,
            endYear: endYear || experience.endYear,
            description: description || experience.description
        }
        
        const updatedExperience = await prisma.experience.update({
            where: {
                id
            },
            data: updatedExpObject
        })

        return NextResponse.json({ experience: updatedExperience });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message });
    }
}

export const DELETE = async (request: NextRequest) => {
    try {
        const { id } = await request.json();
        const deletedExperience = await prisma.experience.delete({
            where: {
                id
            }
        })

        return NextResponse.json({ experience: deletedExperience });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message });
    }
}