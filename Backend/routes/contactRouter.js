import express from "express";
import {
    createContactReauest, 
    getAllContactsRequests
} from "../controllers/contactController.js"

const ContactRouter = express.Router();

// API Routes
ContactRouter.post("/", createContactReauest);


ContactRouter.get("/", getAllContactsRequests); 

export default ContactRouter;
