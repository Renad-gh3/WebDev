// import mongoose from "mongoose";

// const postSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     content: { type: String, required: true },
//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     tags: [String], // Example: ["mountains", "adventure"]
//     image: { type: String, required: true }, // Store image URL or path
//     city: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now },
//     activityType: {
//       type: String,
//       enum: ["Adventure", "Natural", "Sport", "History"],
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Post", postSchema);
// //const posrModel = mongoose.model.post || mongoose.model.("Post", postSchema);")

// export default postModel;

import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // وقفتها عشان الاثروتايز مايعطلني
      // required: true,
    },
    tags: [String], // Example: ["mountains", "adventure"]
    image: { type: String, required: true }, // Store image URL or path
    city: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    activityType: {
      type: String,
      enum: ["Adventure", "Natural", "Sport", "History"],
      required: true,
    },
  },
  { timestamps: true }
);

// Use ES module export
export default mongoose.model("Post", postSchema);
