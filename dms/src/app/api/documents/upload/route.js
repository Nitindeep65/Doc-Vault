import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import Document from "@/models/document";
import Busboy from "busboy";
import { Readable } from "stream";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  await connectDB();

  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json({ error: "Content-Type must be multipart/form-data" }, { status: 400 });
  }

  const bb = Busboy({ headers: { "content-type": contentType } });
  const fields = {};
  let filename = "";
  let mimeType = "";
  let filePath = "";

  const stream = Readable.fromWeb(req.body);

  const promise = new Promise((resolve, reject) => {
    bb.on("file", (name, file, info) => {
      filename = info.filename.replace(/\s+/g, "_"); // sanitize filename
      mimeType = info.mimeType;

      const uploadDir = path.join(process.cwd(), "public", "uploads");

      // ✅ Ensure uploads directory exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      filePath = path.join(uploadDir, filename);
      const writeStream = fs.createWriteStream(filePath);
      file.pipe(writeStream);

      writeStream.on("finish", () => {
        console.log(`File saved to ${filePath}`);
      });
      writeStream.on("error", reject);
    });

    bb.on("field", (fieldname, val) => {
      fields[fieldname] = val;
    });

    bb.on("error", reject);
    bb.on("finish", resolve);

    stream.pipe(bb);
  });

  await promise;

  if (!fields.userId || !filename) {
    return NextResponse.json({ error: "Missing userId or file" }, { status: 400 });
  }

  const fileUrl = `/uploads/${filename}`;
  const stats = fs.statSync(filePath);

  const newDoc = new Document({
    userId: fields.userId,
    fileName: filename,
    fileType: mimeType,
    size: stats.size,
    fileUrl,
  });

  await newDoc.save();

  return NextResponse.json({ message: "File uploaded", documentId: newDoc._id }, { status: 201 });
}
