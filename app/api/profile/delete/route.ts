import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import connectDB from '@/lib/dbConnect'
import User from '@/models/UserModel'

export async function DELETE() {
  await connectDB()

  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await User.findOneAndDelete({ clerkUserId: userId })

  if (!user) {
    return NextResponse.json({ error: 'User does not exists' }, { status: 404 })
  }

  return NextResponse.json({ success: true, message: "user has been deleted" })
}