import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: {type: String, required: true},
        gender: { 
            type: String,
            enum: ["أنثى", "ذكر"], 
            required: true 
        },
        mobile: { type: String, required: true }, 
        dob: { type: Date },
        email: {type: String, required: true},
        language: {
            type: String,
            enum: ["العربية", "الإنجليزية", "الفرنسية"],
            required: true
        },   
        message: { type: String, required: true },
        author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // وقفتها عشان الاثروتايز مايعطلني
        // required: true,
        },
        tags: {type: String}, // Example: ["mountains", "adventure"]
        createdAt: { type: Date, default: Date.now }    
    },{ timestamps: true }
);

// Use ES module export
export default mongoose.model("Contact", contactSchema);
