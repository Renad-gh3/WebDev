document.addEventListener("DOMContentLoaded", function () {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");

    burger.addEventListener("click", function () {
        nav.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links li a").forEach((link) => {
        link.addEventListener("click", function () {
            nav.classList.remove("active");
        });
    });

    const blogForm = document.getElementById('blogForm');
    if (blogForm) {
        blogForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const isValid = validateForm();
            if (isValid) {
                await submitForm();
            }
        });
    }

    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.addEventListener('change', function (event) {
            const file = event.target.files[0];
            const imagePreview = document.querySelector('.preview-image');
            if (file && imagePreview) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    imagePreview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

});


async function submitForm() {
    try {
        const title = document.getElementById('title').value.trim();
        const content = document.getElementById('content').value.trim();
        const city = document.getElementById('city').value;
        const imageFile = document.getElementById('fileInput').files[0]; // Get the file
        const selectedActivity = document.querySelector('input[name="activityType"]:checked')?.value;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('city', city);
        formData.append("image", imageFile);
        formData.append("activityType", selectedActivity);

        
        const res = await fetch("http://localhost:5000/api/post", {
            method: "POST",
            body: formData,
        });
        
        const result = await res.json();
        if (res.ok && result.success) {
            showSuccessMessage();
            document.getElementById('blogForm').reset();
            document.querySelector('.preview-image').src = "../Media/Saudi-Zakhrafa.png";

        } else {
            document.getElementById('errorBox').innerText = result.message || 'حدث خطأ';
        }
    } catch (error) {
        res.json({ success: false, message: error.message || "ERROR" });
    }  
}



function validateForm() {
    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();
    const city = document.getElementById('city');
    const date = document.querySelector('input[type="date"]'); 
    const files = document.getElementById('fileInput').files;
    const activities = document.querySelectorAll('input[name="activityType"]:checked');
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    const errorBox = document.getElementById('errorBox');

    let errors = [];
    
    if (title === '') errors.push('!الرجاء إدخال عنوان السرد');
    if (title.length > 100) errors.push('العنوان يجب أن لا يتجاوز 100 حرف');
    
    if (city && city.value === '') errors.push('الرجاء اختيار المدينة');

    if (content === '') errors.push('الرجاء إدخال محتوى السرد');
    else if (content.length < 20) errors.push('المحتوى يجب أن يكون 20 حرفًا على الأقل');
    
    if (date && date.value === '') errors.push('!الرجاء إختيار التاريخ');
    else if (date && !datePattern.test(date.value)) errors.push('يرجى إدخال التاريخ بصيغة صحيحة YYYY-MM-DD');
    
    if (activities.length === 0) errors.push('يجب اختيار نشاط واحد على الأقل');
    if (files.length === 0) errors.push('يجب رفع صورة واحدة على الأقل');

    if (errors.length > 0) {
        if (errorBox) {
            errorBox.innerHTML = errors.map(error => `<p>${error}</p>`).join('');
            errorBox.style.display = 'block';
        }
        return false;
    } else {
        if (errorBox) {
            errorBox.style.display = 'none';
            errorBox.innerHTML = '';
        }
        return true;
    }
}


function showSuccessMessage() {
    const successMessage = document.createElement('div');
    
    successMessage.textContent = '!تم نشر سردك بنجاح في مسرد';
    Object.assign(successMessage.style, {
        position: 'fixed',
        top: '100px',
        left: '45px',
        backgroundColor: '#41A66C',
        color: 'white',
        padding: '15px 40px',
        borderRadius: '5px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        fontWeight: 'bold',
        zIndex: '1000',
        opacity: '1',
        fontSize: '18px',
        transition: 'opacity 0.5s ease-in-out',
    });

    document.body.appendChild(successMessage);

    setTimeout(() => {
        successMessage.style.opacity = '0';
        setTimeout(() => successMessage.remove(), 500);
    }, 3000);
}

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const imagePreview = document.querySelector('.preview-image');

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

