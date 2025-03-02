// Function to validate the form
function validateForm() {
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const gender = document.querySelector('input[name="gender"]:checked');
  const mobile = document.getElementById('mobile').value.trim();
  const dob = document.getElementById('dob').value;
  const email = document.getElementById('email').value.trim();
  const language = document.getElementById('language').value;
  const message = document.getElementById('message').value.trim();

  const errors = [];

  if (firstName === '') errors.push('الرجاء إدخال الاسم الأول.');
  if (lastName === '') errors.push('الرجاء إدخال الاسم الأخير.');
  if (!gender) errors.push('الرجاء اختيار الجنس.');
  if (mobile === '') errors.push('الرجاء إدخال رقم الجوال.');
  if (dob === '') errors.push('الرجاء إدخال تاريخ الميلاد.');
  if (email === '') errors.push('الرجاء إدخال البريد الإلكتروني.');
  if (language === '') errors.push('الرجاء اختيار اللغة المفضلة.');
  if (message === '') errors.push('الرجاء كتابة الرسالة.');

  // Validate mobile number (basic check for Saudi format e.g., 05XXXXXXXX)
  const mobileRegex = /^(05|5)\d{8}$/;
  if (mobile && !mobileRegex.test(mobile)) {
      errors.push('الرجاء إدخال رقم جوال صحيح مكون من 10 أرقام ويبدأ بـ 05.');
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
      errors.push('الرجاء إدخال بريد إلكتروني صحيح.');
  }

  // عرض الأخطاء في البوب أوفر
  const errorBox = document.getElementById('form-errors');
  if (errors.length > 0) {
      errorBox.innerHTML = errors.map(error => `<p>${error}</p>`).join('');
      errorBox.style.display = 'block';
      return false; // منع الإرسال
  } else {
      errorBox.style.display = 'none'; // أخفي التنبيه
  }

  // If all is good, show success message
  showSuccessMessage();
  return true;
}

// Function to show success message
function showSuccessMessage() {
  alert('تم إرسال النموذج بنجاح!');
}

// Add an event listener to the form
document.getElementById('contact-form').addEventListener('submit', function (event) {
  event.preventDefault();
  if (validateForm()) {
      console.log('تم إرسال النموذج بنجاح!');
      setTimeout(() => {
          alert('شكرًا لتواصلك معنا!');
      }, 1000);
  }
});
