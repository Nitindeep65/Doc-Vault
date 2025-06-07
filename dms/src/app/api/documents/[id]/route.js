import { connectDB } from "@/libs/mongodb";
import Document from "@/models/document";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  await connectDB();

  const { id } = params;

  try {
    const doc = await Document.findById(id);

    if (!doc) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    // Delete the file from the uploads folder
    const filePath = path.join(process.cwd(), "public", doc.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from database
    await Document.findByIdAndDelete(id);

    return NextResponse.json({ message: "Document deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete document" }, { status: 500 });
  }
}
