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
      return response(400, { error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, password: hashedPassword });

    await newUser.save();

    return response(201, { message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    return response(500, { error: "Internal Server Error" });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(),
  });
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "https://doc-vault-nine.vercel.app", // ✅ Your deployed frontend URL
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  };
}

function response(status, body) {
  return new NextResponse(JSON.stringify(body), {
    status,
    headers: corsHeaders(),
  });
}
