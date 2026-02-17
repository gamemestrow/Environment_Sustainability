import { NextRequest, NextResponse } from "next/server";
import  User  from "@/models/UserModel"; // Import your User model

export async function POST(req: NextRequest) {
  try {
     const userid = "12345"; // Placeholder user ID, replace with actual user identification logic

    // Basic validation

    if(!userid){
        return NextResponse.json(
            { success: false, message: "User ID is required" },
            { status: 400 }
        );
    }
    const body = await req.json();
    const { name, email, phone } = body;

    const user = await User.findOne({ _id: userid });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
   
    if (!name || !email || !phone ) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // TODO: Save to database (MongoDB)
    await User.updateOne({ _id: userid }, { name, email, phone });

    return NextResponse.json(
      {
        success: true,
        message: "Profile updated successfully",
        data: { name, email, phone },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
