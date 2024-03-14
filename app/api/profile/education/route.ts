import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";

export const GET = async (request: NextRequest) => {
    try {
        const searchParams = request.nextUrl.searchParams;
        const userId = Number(searchParams.get('userId'));

        let allEducation;
        if (userId) {
            const userWithEducations = await prisma.user.findUnique({
                where: {
                    id: userId
                },
                select: {
                    educations: true
                }
            })

            allEducation = userWithEducations?.educations;
        } else {
            allEducation = await prisma.education.findMany({});
        }
        return NextResponse.json({ allEducation })
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message })
    }
}

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const { 
            school, 
            degree, 
            fieldOfStudy, 
            startMonth, 
            startYear,
            endMonth,
            endYear,
            description,
            grade,
            userId
        } = body;

        const newEducation = await prisma.education.create({
            data: {
                school,
                degree,
                fieldOfStudy,
                startMonth,
                startYear,
                endMonth: endMonth || 'Present',
                endYear: endYear || null,
                description,
                grade
            }
        })

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                educations: {
                    connect: {
                        id: newEducation.id
                    }
                }
            }
        })

        return NextResponse.json({ education: newEducation });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message });
    }
}

export const PUT = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const { id, school, degree, fieldOfStudy, startMonth, startYear, endMonth, endYear, description, grade } = body;

        if (!id) {
            return NextResponse.json({ error: 'Education id is required' });
        }

        const education = await prisma.education.findUnique({
            where: {
                id
            }
        })

        if (!education) {
            return NextResponse.json({ error: 'Education not found' });
        }

        const updatedEducationObject = {
            school: school || education.school,
            degree: degree || education.degree,
            fieldOfStudy: fieldOfStudy || education.fieldOfStudy,
            startMonth: startMonth || education.startMonth,
            startYear: startYear || education.startYear,
            endMonth: endMonth || education.endMonth,
            endYear: endYear || education.endYear,
            description: description || education.description,
            grade: grade || education.grade
        }

        const updatedEducation = await prisma.education.update({
            where: {
                id
            },
            data: updatedEducationObject
        })

        return NextResponse.json({ education: updatedEducation });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message });
    }
}

export const DELETE = async (request: NextRequest) => {
    try {
        const { id } = await request.json();
        const deletedEducation = await prisma.education.delete({
            where: {
                id
            }
        })

        return NextResponse.json({ education: deletedEducation });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message });
    }
}