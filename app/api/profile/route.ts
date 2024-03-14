import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";

export const GET = async (request: NextRequest) => {
    try {
        const searchParams = request.nextUrl.searchParams;
        const userId = Number(searchParams.get('userId'));

        const userProfile = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                firstName: true,
                lastName: true,
                headline: true,
                location: {
                    select: {
                        city: true,
                        state: true,
                        country: true
                    }
                },
                about: {
                    select: {
                        about: true
                    }
                },
                experiences: true,
                educations: true,
                skills: true
            }
        })

        return NextResponse.json({ userProfile })
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message })
    }
}

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const { firstName, lastName, headline, city, state, country } = body;
        
        const newLocation = await prisma.location.create({
            data: {
                city,
                state,
                country
            }
        })

        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                headline,
                locationId: newLocation.id || null
            }
        })

        return NextResponse.json({ user: newUser });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message });
    }
}

export const PUT = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const { id, firstName, lastName, headline } = body;

        if (!id) {
            return NextResponse.json({ error: 'User ID is required' });
        }

        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        if (!user) {
            return NextResponse.json({ error: 'User not found' });
        }

        const updatedUserObject = {
            firstName: firstName || user.firstName,
            lastName: lastName || user.lastName,
            headline: headline || user.headline
        }

        const updatedUser = await prisma.user.update({
            where: {
                id
            },
            data: updatedUserObject
        })

        return NextResponse.json({ user: updatedUser });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message });
    }
}

export const DELETE = async (request: NextRequest) => {
    try {
        const { id } = await request.json();
        const deletedUser = await prisma.user.delete({
            where: {
                id
            }
        })

        return NextResponse.json({ user: deletedUser });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message });
    }
}