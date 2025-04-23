import contactModel from "../models/contactModel.js";
const createContactReauest = async (req, res) => { // إنشاء منشور جديد
    try {
        const {firstName, lastName, gender, mobile, dob, email, language, message } = req.body;

        const newContact = new contactModel({
            firstName,
            lastName, 
            gender, 
            mobile, 
            dob, 
            email, 
            language, 
            message
        });

        await newContact.save();
        res.json({ success: true, message: "رسالة التواصل وصلتنا وسيتم التواصل معك قريبا" });
    
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "حدث خطأ أثناء صنع رسالة التواصل" });
    }
};

const getAllContactsRequests = async (req, res) => { // جلب جميع طلبات التواصل (مع الفلترة حسب اللغة والجنس)
    try {
        const { gender, language } = req.query;
        let query = {};
        if (gender) query.gender = gender;
        if (language) query.language = language;
    
        const contacts = await contactModel.find(query);
        res.json(contacts);
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "حدث خطأ أثناء حذف رسالة التواصل"});
    }
};


export { createContactReauest, getAllContactsRequests };
