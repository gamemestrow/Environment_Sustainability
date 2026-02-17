import { auth, currentUser } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/dbConnect'
import User from '@/models/UserModel'

export async function POST(req: NextRequest) {
  await connectDB()

  const { name, phone } = await req.json();

  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const clerkUser = await currentUser()

  let user = await User.findOne({ clerkUserId: userId })

  if (!user) {
    user = await User.create({
      clerkUserId: userId,
      name: name || clerkUser?.fullName || 'Unnamed User',
      phone: phone || null,
      email: clerkUser?.emailAddresses[0].emailAddress ,
      role: clerkUser?.publicMetadata?.role || 'user',
    });
  }

  

  return NextResponse.json({ success: true, user })
}