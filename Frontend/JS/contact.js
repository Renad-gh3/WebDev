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

  const blogForm = document.getElementById('contact-form');
  if (blogForm) {
    blogForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const isValid = validateForm();
      if (isValid) {
        await submitForm();
      }
    });
  }
});


function validateForm() {
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const mobile = document.getElementById('mobile').value.trim();
  const dob = document.getElementById('dob').value;
  const email = document.getElementById('email').value.trim();
  const language = document.getElementById('language').value;
  const message = document.getElementById('message').value.trim();
  const gender = document.querySelector('input[name="gender"]:checked');
  const mobileRegex = /^(05|5)\d{8}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errorBox = document.getElementById('errorBox');

  let errors = [];

  if (!firstName) errors.push('الرجاء إدخال الاسم الأول');
  if (!lastName) errors.push('الرجاء إدخال الاسم الأخير');
  if (!gender) errors.push('الرجاء تحديد الجنس');
  if (!mobile) errors.push('الرجاء إدخال رقم الجوال');
  if (!dob) errors.push('الرجاء إدخال تاريخ الميلاد');
  if (!email) errors.push('الرجاء إدخال البريد الإلكتروني');
  if (!language) errors.push('الرجاء اختيار اللغة المفضلة');
  if (!message) errors.push('الرجاء إدخال الرسالة');
  if (mobile && !mobileRegex.test(mobile)) errors.push("الرجاء إدخال رقم جوال صحيح مكون من 10 أرقام ويبدأ بـ 05");
  if (email && !emailRegex.test(email)) errors.push("الرجاء إدخال بريد إلكتروني صحيح");
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

async function submitForm() {
  try {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const mobile = document.getElementById('mobile').value;
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value;
    const language = document.getElementById('language').value;
    const message = document.getElementById('message').value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;


    const data = {
      firstName,
      lastName,
      mobile,
      dob,
      email,
      language,
      message,
      gender
    };

    const res = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });
    
    const result = await res.json();

    if (res.ok && result.success) {
      showSuccessMessage();
      document.getElementById('contact-form').reset();
    } else {
      document.getElementById('errorBox').innerText = result.message || 'حدث خطأ';
    }
  } catch (error) {
    document.getElementById('errorBox').innerText = error.message || 'حدث خطأ في الاتصال بالسيرفر';
  }  
}


function showSuccessMessage() {
  const successMessage = document.createElement('div');

  successMessage.textContent = '!تم إرسال رسالة التواصل بنجاح';
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

  setTimeout(() => {
    successMessage.style.opacity = '0';
    setTimeout(() => successMessage.remove(), 500);
  }, 3000);

  const submitButton = document.querySelector('#contact-form button[type="submit"]');
  if (submitButton) {
    submitButton.disabled = true;
    setTimeout(() => submitButton.disabled = false, 3000);
  }
}
