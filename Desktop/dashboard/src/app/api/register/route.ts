import { connectDB } from "@/lib/db"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import User from "@/models/User"

export async function POST(req: Request) {
  try {

    await connectDB()

    const body = await req.json()
    const { name, email, password } = body

    // validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 }
      )
    }

    // check existing user
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      )
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    })

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email
        }
      },
      { status: 201 }
    )

  } catch (error) {

    console.error("REGISTER ERROR:", error)

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    )
  }
}