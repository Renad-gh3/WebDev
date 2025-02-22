// posting.js

// Function to validate the form
function validateForm() {
  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const content = document.getElementById('content').value.trim();
  const image = document.getElementById('image').value;
  
  // Check if title, author, and content are filled
  if (title === '' || author === '' || content === '') {
    alert('Please fill in all required fields: Title, Author, and Content.');
      return false; // Prevent form submission
  }
  
  // Check if an image is uploaded (optional)
  if (image === '') {
    const confirmUpload = confirm('No image uploaded. Do you want to continue without an image?');
    if (!confirmUpload) {
      return false; // Prevent form submission
    }
  }
  
  // If everything is valid, show a success message
  showSuccessMessage();
  return true; // Allow form submission
}
  
// Function to change the background based on the selected city
function changeBackground(city) {
  const body = document.getElementById('city-background');
  let imageUrl = '';
  
  switch (city) {
    case 'الرياض':
      imageUrl = 'Frontend\Media\Riyadh.jpg';
      break;
    case 'جدة':
      imageUrl = 'Frontend\Media\Jeddah.jpg';
      break;
    case 'مكة المكرمة':
      imageUrl = 'Frontend\Media\Makkah.webp';
      break;
    case 'الطائف':
      imageUrl = 'Frontend\Media\Taif.webp';
      break;
    case 'الباحة':
      imageUrl = 'Frontend\Media\Al Baha.jpg';
      break;
    case 'حائل':
      imageUrl = 'Frontend\Media\Hail.jpg';
      break;  
    case 'العلا':
      imageUrl = 'Frontend\Media\AlUla.jpg';
      break;
    case 'ينبع':
      imageUrl = 'Frontend\Media\Yanbu.webp';
      break;
    case 'القصيم':
      imageUrl = 'Frontend\Media\Qassim.jpg';
      break;
    case 'نجران':
      imageUrl = 'Frontend\Media\Najran.webp';
      break;
    case 'عسير':
      imageUrl = 'Frontend\Media\Aseer.webp';
      break;
    case 'الجبيل':
      imageUrl = 'Frontend\Media\Al Jubail.avif';
      break;
    case 'جازان':
      imageUrl = 'Frontend\Media\Jazan.jpg';
      break;
    case 'تبوك':
      imageUrl = 'Frontend\Media\Tabuk.jpg';
      break;
    default:
      imageUrl = 'Frontend\Media\Saudi.jpg'; 
  }
  
  body.style.backgroundImage = `url(${imageUrl})`;
}
 

// Add an event listener to the city dropdown
document.getElementById('city').addEventListener('change', function (event) {
  const selectedCity = event.target.value;
  changeBackground(selectedCity);
});
// Function to display a success message
function showSuccessMessage() {
  const form = document.getElementById('blogForm');
  const successMessage = document.createElement('div');
  successMessage.textContent = 'تم نشر سردك بنجاح!';
  successMessage.style.color = '#2c5f2d'; // Dark green
  successMessage.style.fontWeight = 'bold';
  successMessage.style.marginTop = '20px';
  successMessage.style.textAlign = 'center';
  form.appendChild(successMessage);
  
  // Clear the form after submission
  setTimeout(() => {
    form.reset();
    successMessage.remove();
  }, 3000); // Remove the message after 3 seconds
}
  
// Add an event listener to the form
document.getElementById('blogForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission
  if (validateForm()) {
    // If the form is valid, submit it (you can add backend logic here)
    console.log('Form submitted successfully!');
    // Simulate a backend submission delay
    setTimeout(() => {
      alert('تم نشر السرد بنجاح');
    }, 1000);
  }
});

// Design tiré du site flatuicolors.com

$(document).ready(function(){
    
  var countOption = $('.old-select option').size();
  
  function openSelect(){
      var heightSelect = $('.new-select').height();
      var j=1;
      $('.new-select .new-option').each(function(){
          $(this).addClass('reveal');
          $(this).css({
              'box-shadow':'0 1px 1px rgba(0,0,0,0.1)',
              'left':'0',
              'right':'0',
              'top': j*(heightSelect+1)+'px'
          });
          j++;
      });
  }
  
  function closeSelect(){
      var i=0;
      $('.new-select .new-option').each(function(){
          $(this).removeClass('reveal');
          if(i<countOption-3){
              $(this).css('top',0);
              $(this).css('box-shadow','none');
          }
          else if(i===countOption-3){
              $(this).css('top','3px');
          }
          else if(i===countOption-2){
              $(this).css({
                  'top':'7px',
                  'left':'2px',
                  'right':'2px'
              });
          }
          else if(i===countOption-1){
              $(this).css({
                  'top':'11px',
                  'left':'4px',
                  'right':'4px'
              });
          }
          i++;
      });
  }
  
  // Initialisation
  if($('.old-select option[selected]').size() === 1){
      $('.selection p span').html($('.old-select option[selected]').html());
  }
  else{
      $('.selection p span').html($('.old-select option:first-child').html());
  }
  
  $('.old-select option').each(function(){
      newValue = $(this).val();
      newHTML = $(this).html();
      $('.new-select').append('<div class="new-option" data-value="'+newValue+'"><p>'+newHTML+'</p></div>');
  });
  
  var reverseIndex = countOption;
  $('.new-select .new-option').each(function(){
      $(this).css('z-index',reverseIndex);
      reverseIndex = reverseIndex-1;        
  });
  
  closeSelect();
  
  
  // Ouverture / Fermeture
  $('.selection').click(function(){
      $(this).toggleClass('open');
      if($(this).hasClass('open')===true){openSelect();}
      else{closeSelect();}
  });
  
  
  // Selection 
  $('.new-option').click(function(){
      var newValue = $(this).data('value');
      
      // Selection New Select
      $('.selection p span').html($(this).find('p').html());
      $('.selection').click();
      
      // Selection Old Select
      $('.old-select option[selected]').removeAttr('selected');
      $('.old-select option[value="'+newValue+'"]').attr('selected','');
      
      // Visuellement l'option dans le old-select ne change pas
      // mais la value selectionnée est bien pris en compte lors 
      // de l'envoi du formulaire. Test à l'appui.
      
  });
});

