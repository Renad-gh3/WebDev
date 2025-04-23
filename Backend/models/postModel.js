
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    city: { type: String, required: true },
    activityType: {
      type: String,
      enum: ["طبيعة", "تاريخي", "ثقافي", "ترفيهي", "تعليمي", "علاجي"],
      required: true
    },
    image: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tags: { type: String },
    createdAt: { type: Date, default: Date.now }    
  },{ timestamps: true }
);

// Use ES module export
export default mongoose.model("Post", postSchema);
