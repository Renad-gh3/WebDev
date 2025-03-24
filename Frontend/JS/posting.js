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
    document.getElementById('blogForm').addEventListener('submit', validateForm);

});

function validateForm(event) {
    event.preventDefault(); 

    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();
    const city = document.getElementById('city');
    const date = document.querySelector('input[type="date"]'); 
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    const files = document.getElementById('fileInput').files;
    const activities = document.querySelectorAll('input[name="activity"]:checked');
    
    let errors = [];
    
    city.setCustomValidity('');
    if (date) date.setCustomValidity(''); 

    if (title === '') errors.push('!الرجاء إدخال عنوان السرد');
    if (title.length > 100) errors.push('العنوان يجب أن لا يتجاوز 100 حرف');
    if (city.value === '') {
        errors.push('الرجاء اختيار المدينة');
        city.setCustomValidity('يجب اختيار المدينة'); 
    }
    if (content === '') {
        errors.push('الرجاء إدخال محتوى السرد');
    } else if (content.length < 20) {
        errors.push('المحتوى يجب أن يكون 20 حرفًا على الأقل');
    }
    if (date.value === '') {
        errors.push('!الرجاء إدخال التاريخ');
        if (date) date.setCustomValidity('يجب إدخال التاريخ'); 
    } else if (!datePattern.test(date.value)) {
        errors.push('يرجى إدخال التاريخ بصيغة صحيحة YYYY-MM-DD');
    }
    if (activities.length === 0) errors.push('يجب اختيار نشاط واحد على الأقل');
    if (files.length === 0) errors.push('يجب رفع صورة واحدة على الأقل');


    const errorBox = document.getElementById('errorBox');
    if (errors.length > 0) {
        if (errorBox) {
            errorBox.innerHTML = errors.map(error => `<p>${error}</p>`).join('');
            errorBox.style.display = 'block';
        } else {
            console.error("❌ العنصر errorBox غير موجود في DOM");
        }
        return false;
    } else if (errorBox) {
        errorBox.style.display = 'none';
    }

    showSuccessMessage();
    return true;
}


function showSuccessMessage() {
    const successMessage = document.createElement('div');
    
    successMessage.textContent = '!تم نشر سردك بنجاح في مسرد';
    successMessage.style.position = 'fixed';
    successMessage.style.top = '100px';
    successMessage.style.left = '45px';
    successMessage.style.backgroundColor = '#41A66C';
    successMessage.style.color = 'white';
    successMessage.style.padding = '15px 40px';
    successMessage.style.borderRadius = '5px';
    successMessage.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
    successMessage.style.fontWeight = 'bold';
    successMessage.style.zIndex = '1000';
    successMessage.style.opacity = '1';
    successMessage.style.fontSize = '18px'; 
    successMessage.style.transition = 'opacity 0.5s ease-in-out';

    document.body.appendChild(successMessage);
    
    document.getElementById('blogForm').reset();

    const imagePreview = document.querySelector('.preview-image');
    imagePreview.src = "../Media/Saudi-Zakhrafa.png"; 

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

