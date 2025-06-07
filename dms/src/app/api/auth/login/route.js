import { connectDB } from "@/libs/mongodb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new NextResponse(
        JSON.stringify({ error: "Email and password are required" }),
        {
          status: 400,
          headers: corsHeaders(),
        }
      );
    }

    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid email or password" }),
        {
          status: 401,
          headers: corsHeaders(),
        }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid email or password" }),
        {
          status: 401,
          headers: corsHeaders(),
        }
      );
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "secret-key",
      { expiresIn: "7d" }
    );

    return new NextResponse(
      JSON.stringify({
        message: "Login successful",
        token,
        user: { id: user._id, fullName: user.fullName, email: user.email },
      }),
      {
        status: 200,
        headers: corsHeaders(),
      }
    );
  } catch (err) {
    console.error("Login Error:", err);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: corsHeaders() }
    );
  }
}

// Handle CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(),
  });
}

// Utility function to add CORS headers
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "https://docu-vault-tent.vercel.app", // ✅ Change to your actual frontend domain
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  };
}
