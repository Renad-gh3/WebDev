// Function to validate the form
function validateForm() {
  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();
  const city = document.getElementById('city').value;
  const date = document.querySelector('input[type="date"]').value;
  const files = document.getElementById('fileInput').files;

  let errors = [];

  if (title === '') errors.push('الرجاء إدخال عنوان السرد');
  if (content === '') errors.push('الرجاء إدخال محتوى السرد');
  if (city === '') errors.push('الرجاء اختيار المدينة');
  if (date === '') errors.push('الرجاء إدخال التاريخ');

  if (files.length === 0) {
      const confirmUpload = confirm('لم تقم برفع أي صورة، هل تريد الاستمرار بدون صور؟');
      if (!confirmUpload) return false;
  }

  if (errors.length > 0) {
      alert(errors.join('\n'));
      return false;
  }

  showSuccessMessage();
  return true;
}

// Function to display a success message
function showSuccessMessage() {
  const form = document.getElementById('blogForm');
  const successMessage = document.createElement('div');
  successMessage.textContent = 'تم نشر سردك بنجاح!';
  successMessage.style.color = '#2c5f2d';
  successMessage.style.fontWeight = 'bold';
  successMessage.style.marginTop = '20px';
  successMessage.style.textAlign = 'center';
  successMessage.style.animation = 'fadeIn 0.5s ease-in-out';

  form.appendChild(successMessage);

  setTimeout(() => {
      form.reset();
      successMessage.style.animation = 'fadeOut 0.5s ease-in-out';
      setTimeout(() => successMessage.remove(), 500);
  }, 3000);
}

// Attach event listener to form
document.getElementById('blogForm').addEventListener('submit', function (event) {
  event.preventDefault(); 
  if (validateForm()) {
      console.log('Form submitted successfully!');
      setTimeout(() => {
          alert('تم نشر السرد بنجاح');
      }, 1000);
  }
});

  function closeSelect() {
      $('.new-select .new-option').removeClass('reveal').css({
          'top': 0,
          'box-shadow': 'none'
      });
  }

  if ($('.old-select option[selected]').length === 1) {
      $('.selection p span').html($('.old-select option[selected]').html());
  } else {
      $('.selection p span').html($('.old-select option:first-child').html());
  }

  $('.old-select option').each(function() {
      const newValue = $(this).val();
      const newHTML = $(this).html();
      $('.new-select').append(`<div class="new-option" data-value="${newValue}"><p>${newHTML}</p></div>`);
  });

  let reverseIndex = countOption;
  $('.new-select .new-option').each(function() {
      $(this).css('z-index', reverseIndex--);
  });

  closeSelect();

  $('.selection').click(function() {
      $(this).toggleClass('open');
      if ($(this).hasClass('open')) {
          openSelect();
      } else {
          closeSelect();
      }
  });

  $('.new-option').click(function() {
      const newValue = $(this).data('value');
      $('.selection p span').html($(this).find('p').html());
      $('.selection').click();
      $('.old-select option[selected]').removeAttr('selected');
      $(`.old-select option[value="${newValue}"]`).attr('selected', '');
  });
});
