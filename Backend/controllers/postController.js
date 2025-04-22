import postModel from "../models/postModel.js";
import fs from "fs";
import mongoose from "mongoose";

// إنشاء منشور جديد
const createPost = async (req, res) => {
  try {
    const { title, content, city, activityType } = req.body;
    const image = req.file?.path;
    const newPost = new postModel({
      title,
      content,
      city,
      activityType,
      image
      // author: req.user.userId, // تم إيقافها مؤقتًا
    });

    await newPost.save();
    res.json({ success: true, message: "تم نشر سردك بنجاح في مسرد" });
  
  } catch (error) {
    console.error("حدث خطأ أثناء صنع المسرد، وهو:", error);
    res.status(500).json({ success: false, message: "حدث خطأ أثناء نشر المسرد" }); 
  }
};

// جلب جميع المنشورات (مع الفلترة حسب المدينة والنشاط)
const getAllPosts = async (req, res) => {
  try {
    const { city, activity } = req.query;
    let query = {};
    if (city) query.city = city;
    if (activity) query.activityType = activity;

    const posts = await postModel.find(query).populate("author", "username");
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "حدث خطأ ما" });
  }
};

// جلب منشورات مقترحة (أربعة فقط)
const getSuggestedPosts = async (req, res) => {
  try {
    const posts = await postModel.find().limit(4);
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "ERROR" });
  }
};

// تحديث منشور
const updatePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "لا يوجد مسرد بهذا المعرف" });

    // if (post.author.toString() !== req.user.userId)
    //   return res.status(403).json({ message: "دخول غير مصرح به" });

    await postModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "تم تحديث المسرد بنجاح!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "حدث خطأ ما خلال تحديث هذا المسرد" });
  }
};

// حذف منشور
const deletePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post) return res.json({ message: "لا يوجد مسرد بهذا المعرف" });

    // if (post.author.toString() !== req.user.userId)
    //   return res.json({ message: "دخول غير مصرح به"" });

    await postModel.findByIdAndDelete(req.params.id);
    res.json({ message: "تم حذف المسرد بنجاح!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "حدث خطأ ما خلال حذف هذا المسرد" });
  }
};
// جلب منشور واحد حسب ID
const getSinglePost = async (req, res) => {
  try {
    // التحقق من صحة ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "معرف غير صالح" });
    }

    const post = await postModel.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "المسرد غير موجود" });
    }

    res.json(post);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "حدث خطأ في الخادم" });
  }
};

// تصدير الدالة الجديدة
export {
  createPost,
  getAllPosts,
  getSinglePost,
  getSuggestedPosts,
  updatePost,
  deletePost,
};
