// Function to validate the form
function validateForm() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value.trim();
    const language = document.getElementById('language').value;
    const message = document.getElementById('message').value.trim();
  
    // Check if all fields are filled
    if (firstName === '' || lastName === '' || mobile === '' || dob === '' || email === '' || language === '' || message === '') {
      alert('الرجاء ملء جميع الحقول المطلوبة.');
      return false; // Prevent form submission
    }
  
    // Validate mobile number (basic check for 10 digits)
    if (!/^\d{10}$/.test(mobile)) {
      alert('الرجاء إدخال رقم جوال صحيح مكون من 10 أرقام.');
      return false;
    }
  
    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('الرجاء إدخال بريد إلكتروني صحيح.');
      return false;
    }
  
    // If everything is valid, show a success message
    alert('تم إرسال النموذج بنجاح!');
    return true; // Allow form submission
  }
  
  // Add an event listener to the form
  document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    if (validateForm()) {
      // If the form is valid, submit it (you can add backend logic here)
      console.log('تم إرسال النموذج بنجاح!');
      // Simulate a backend submission delay
      setTimeout(() => {
        alert('شكرًا لتواصلك معنا!');
      }, 1000);
    }
  });