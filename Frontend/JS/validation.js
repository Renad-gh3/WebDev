document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    
    form.addEventListener("submit", function (event) {
        let isValid = true;

        // Username validation
        const usernameRegex = /^[a-zA-Z\u0600-\u06FF0-9]{3,}$/;
        if (!usernameRegex.test(usernameInput.value)) {
            alert("اسم المستخدم يجب أن يكون 3 أحرف على الأقل ولا يحتوي على رموز خاصة.");
            isValid = false;
        }

        // Password validation
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(passwordInput.value)) {
            alert("كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل،و تشمل رقمًا  واحدًا على الأقل.");
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault(); 
        }
    });
});
