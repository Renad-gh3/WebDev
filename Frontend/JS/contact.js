document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  
  burger.addEventListener("click", function () {
      nav.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links li a").forEach(link => {
      link.addEventListener("click", function(){
        nav.classList.remove("active");
      }); 
  });
  document.getElementById('contact-form').addEventListener("submit", validateForm);
});

function validateForm(event) {
    event.preventDefault(); 

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value.trim();
    const language = document.getElementById('language').value;
    const message = document.getElementById('message').value.trim();
    const gender = document.querySelector('input[name="gender"]:checked');

    let errors = [];

    if (!firstName) errors.push('الرجاء إدخال الاسم الأول');
    if (!lastName) errors.push('الرجاء إدخال الاسم الأخير');
    if (!gender) errors.push('الرجاء تحديد الجنس');
    if (!mobile) errors.push('الرجاء إدخال رقم الجوال');
    if (!dob) errors.push('الرجاء إدخال تاريخ الميلاد');
    if (!email) errors.push('الرجاء إدخال البريد الإلكتروني');
    if (!language) errors.push('الرجاء اختيار اللغة المفضلة');
    if (!message) errors.push('الرجاء إدخال الرسالة');
    

    const mobileRegex = /^(05|5)\d{8}$/;
    if (mobile && !mobileRegex.test(mobile)) {
      errors.push("الرجاء إدخال رقم جوال صحيح مكون من 10 أرقام ويبدأ بـ 05");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      errors.push("الرجاء إدخال بريد إلكتروني صحيح");
    }

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
    successMessage.textContent = '!تم إرسال النموذج بنجاح';
    Object.assign(successMessage.style, {
      position: 'fixed',
      top: '100px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#41A66C',
      color: 'white',
      padding: '15px 40px',
      borderRadius: '5px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      fontWeight: 'bold',
      zIndex: '1000',
      opacity: '1',
      fontSize: '18px',
      transition: 'opacity 0.5s ease-in-out'
    });

      document.body.appendChild(successMessage);

      document.getElementById('contact-form').reset();

      setTimeout(() => {
          successMessage.style.opacity = '0';
          setTimeout(() => successMessage.remove(), 500);
      }, 3000);
  }