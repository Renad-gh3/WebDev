import express from "express";
import multer from "multer";
import {
  createPost,
  getAllPosts,
  getSinglePost,
  getSuggestedPosts,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

const PostRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
  },
});

const upload = multer({ storage: storage });


// API Routes
PostRouter.post("/", upload.single("image"), createPost);

PostRouter.get("/", getAllPosts);
PostRouter.get("/suggested", getSuggestedPosts);
PostRouter.get("/:id", getSinglePost);

PostRouter.put("/:id", updatePost);

PostRouter.delete("/:id", deletePost);


export default PostRouter;
