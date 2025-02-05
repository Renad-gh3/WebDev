import express from "express";
import cors from "cors";
import PostRouter from "./routes/postRouter";
import userRouter from "./routes/userRouter";
import mongoose from "mongoose";

// app config
const app = express();
const port = 5000;

// middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

//api ndpoints
app.use("/api/post",PostRouter) //or app.use("/api/posts", postRoutes);
app.use("/api/user",userRouter) //or app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
  res.send("API WORKING");
});

/*
Not really sure about this section of code
mongoose.connect("mongodb://localhost:27017/travelblog", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(5000, () => console.log("Server running on port 5000")))
  .catch((error) => console.log(error));
*/

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
