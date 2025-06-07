import { connectDB } from "@/libs/mongodb";
import Document from "@/models/document";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const documents = await Document.find({ userId }).sort({ createdAt: -1 });
    return NextResponse.json({ documents }, { status: 200 });
  } catch (err) {
    console.error("Error fetching documents:", err);
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 });
  }
}
