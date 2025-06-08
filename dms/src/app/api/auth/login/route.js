import { connectDB } from "@/libs/mongodb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return jsonResponse(400, { error: "Email and password are required" });
    }

    await connectDB();

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return jsonResponse(401, { error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
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
    return jsonResponse(500, { error: "Internal Server Error" });
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
    "Access-Control-Allow-Origin": "https://doc-vault-nine.vercel.app",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  };
}

function jsonResponse(status, data) {
  return new NextResponse(JSON.stringify(data), {
    status,
    headers: corsHeaders(),
  });
}
