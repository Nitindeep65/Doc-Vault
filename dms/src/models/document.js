import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    fileName: String,
    fileType: String,
    size: Number,
    fileUrl: String, // ✅ Required to allow viewing
  },
  { timestamps: true }
);

export default mongoose.models.Document || mongoose.model("Document", DocumentSchema);
      