import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';
import User from '@/models/user';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Connect to MongoDB
    await connectToDatabase();

    const existsUser = await User.findOne({ email: body.email });
    if (existsUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }
    
    // Save the user/lead information to MongoDB
    const newUser = new User({
      name: body.name,
      email: body.email,
      mobile: body.mobile,
      business: body.business,
      product: "ApexManagement"
    });
    
    await newUser.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to process download request:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}