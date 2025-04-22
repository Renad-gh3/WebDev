import express from "express";
import {
    createContactReauest, 
    getAllContactsRequests
} from "../controllers/contactController.js"
// import authMiddleware from "../middleware/auth.js";

const ContactRouter = express.Router();

// API Routes
// شلت  authMiddleware, عشانها ماتفعلت لسى ومابيها تعطل علي الشغل
// PostRouter.post("/", authMiddleware, upload.single("image"), createPost);
ContactRouter.post("/", createContactReauest);


ContactRouter.get("/", getAllContactsRequests); 

export default ContactRouter;
