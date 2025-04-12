// import { Router } from "express";
// import express from "express";
// import multer from "multer";
// import {
//   createPost,
//   getAllPosts,
//   getSuggestedPosts,
//   updatePost,
//   deletePost,
// } from "../controllers/postController";
// import authMiddleware from "../middleware/authMiddleware";
// import upload, { single } from "../middleware/uploadMiddleware";

// const PostRouter = express.Router();

// //Image Stroage Engine
// const storage = multer.diskStorage({
//   destination: "uploads",
//   filename: (req, file, cb) => {
//     return cb(null, `${Date.now()}${file.originalname}`);
//   },
// });

// const upload = multer({ storage: storage });

// PostRouter.post("/", authMiddleware, single("image"), createPost);
// PostRouter.get("/", getAllPosts);
// PostRouter.get("/suggested", getSuggestedPosts);
// PostRouter.put("/:id", authMiddleware, updatePost);
// PostRouter.delete("/:id", authMiddleware, deletePost);

// export default PostRouter;
// import { Router } from "express";
// import express from "express";
// import multer from "multer";
// import {
//   createPost,
//   getAllPosts,
//   getSuggestedPosts,
//   updatePost,
//   deletePost,
// } from "../controllers/postController";
// import authMiddleware from "../middleware/authMiddleware";
// import upload, { single } from "../middleware/uploadMiddleware";

// const PostRouter = express.Router();

// //Image Stroage Engine
// const storage = multer.diskStorage({
//   destination: "uploads",
//   filename: (req, file, cb) => {
//     return cb(null, `${Date.now()}${file.originalname}`);
//   },
// });

// const upload = multer({ storage: storage });

// PostRouter.post("/", authMiddleware, single("image"), createPost);
// PostRouter.get("/", getAllPosts);
// PostRouter.get("/suggested", getSuggestedPosts);
// PostRouter.put("/:id", authMiddleware, updatePost);
// PostRouter.delete("/:id", authMiddleware, deletePost);
// #########################################################
// export default PostRouter;
import express from "express";
import multer from "multer";
import {
  createPost,
  getAllPosts,
  getSuggestedPosts,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
// import authMiddleware from "../middleware/auth.js";

const PostRouter = express.Router();

// Configure storage for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Save images in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Generate a unique filename
  },
});

// Initialize `multer` for file uploads
const upload = multer({ storage: storage });

// API Routes
// شلت  authMiddleware, عشانها ماتفعلت لسى ومابيها تعطل علي الشغل
// PostRouter.post("/", authMiddleware, upload.single("image"), createPost);
PostRouter.post("/", upload.single("image"), createPost);
PostRouter.get("/", getAllPosts);
PostRouter.get("/suggested", getSuggestedPosts);
// شلت  authMiddleware, عشانها ماتفعلت لسى ومابيها تعطل علي الشغل
// PostRouter.put("/:id", authMiddleware, updatePost);
PostRouter.put("/:id", updatePost);
// شلت  authMiddleware, عشانها ماتفعلت لسى ومابيها تعطل علي الشغل
// PostRouter.delete("/:id", authMiddleware, deletePost);
PostRouter.delete("/:id", deletePost);

export default PostRouter;
