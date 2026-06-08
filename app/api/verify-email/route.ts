import User from "@/models/user"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { email } = await req.json()
    
        if(!email) {
            return NextResponse.json(
                { message: "Please provide email to verify!"},
                { status: 400 }
            )
        }
    
        const user = await User.findOne({ email })
        if(!user) {
            return NextResponse.json(
                { message: 'No user exists for this email!'},
                { status : 404 }
            )
        }
    
        return NextResponse.json(
            { message: "Get user successfully!"},
            { status: 200 }
        )
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { message: 'Something went wrong!' },
            { status: 500 }
        )
    }
}