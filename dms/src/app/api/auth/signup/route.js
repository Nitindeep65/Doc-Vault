import { connectDB } from "@/libs/mongodb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { fullName, email, password } = await req.json();

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ error: "Email already registered" }),
        {
          status: 400,
          headers: corsHeaders(),
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, password: hashedPassword }); // ✅ Make sure your User schema field is `password`, not `passwordHash`

    await newUser.save();

    return new NextResponse(
      JSON.stringify({ message: "User registered successfully" }),
      {
        status: 201,
        headers: corsHeaders(),
      }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: corsHeaders(),
      }
    );
  }
}

// Handle preflight CORS requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(),
  });
}

// CORS headers for Vercel deployment
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "https://docu-vault-tent.vercel.app", // ✅ Replace with your frontend URL
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  };
}
