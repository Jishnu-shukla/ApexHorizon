import { connectToDatabase } from "@/lib/database"
import query from "@/models/query";
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const { name, email, interest, message } = await req.json()

    if(!email || !interest || interest == "") {
        return NextResponse.json(
            { message: "Required fields not found!" },
            { status: 400 }
        )
    }

    try {
        await connectToDatabase();
    
        const newQuery = await query.create({ name, email, interest, message })

        if(!newQuery) {
            return NextResponse.json(
                { message: 'Failed to create query in db!' },
                { status: 500 }
            )
        }

        return NextResponse.json(
            { message: 'Successfully saved query!' },
            { status: 201 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'Something went wrong!' },
            { status: 500 }
        )
    }
}