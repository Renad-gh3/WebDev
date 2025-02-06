import { Router } from "express";
import express from "express";
import multer from "multer";
import { createPost, getAllPosts, getSuggestedPosts, updatePost, deletePost } from "../controllers/postController";
import authMiddleware from "../middleware/authMiddleware";
import upload, { single } from "../middleware/uploadMiddleware"; 


const PostRouter = express.Router();

//Image Stroage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
    },
})

const upload = multer({ storage: storage });

PostRouter.post("/", authMiddleware, single("image"), createPost);
PostRouter.get("/", getAllPosts);
PostRouter.get("/suggested", getSuggestedPosts);
PostRouter.put("/:id", authMiddleware, updatePost);
PostRouter.delete("/:id", authMiddleware, deletePost);

export default PostRouter;