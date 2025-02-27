document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");

  burger.addEventListener("click", function () {
    nav.classList.toggle("active");
  });

  // إغلاق القائمة عند النقر على أي عنصر فيها
  document.querySelectorAll(".nav-links li a").forEach((link) => {
    link.addEventListener("click", function () {
      nav.classList.remove("active");
    });
  });
});

// للحذففف \\\\\\\\\\\\\\\\\\\\\\\\\\\\
const deleteButtons = document.querySelectorAll(".delete-button");
deleteButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const blogCard = this.closest(".blog-card");
    if (blogCard) {
      blogCard.remove();
    }
  });
});

// photo slider
let items = document.querySelectorAll(".slider .list .item");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let thumbnails = document.querySelectorAll(".thumbnail .item");

// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function () {
  itemActive = itemActive + 1;
  if (itemActive >= countItem) {
    itemActive = 0;
  }
  showSlider();
};
//event prev click
prev.onclick = function () {
  itemActive = itemActive - 1;
  if (itemActive < 0) {
    itemActive = countItem - 1;
  }
  showSlider();
};
// auto run slider
let refreshInterval = setInterval(() => {
  next.click();
}, 9000);
function showSlider() {
  // remove item active old
  let itemActiveOld = document.querySelector(".slider .list .item.active");
  let thumbnailActiveOld = document.querySelector(".thumbnail .item.active");
  itemActiveOld.classList.remove("active");
  thumbnailActiveOld.classList.remove("active");

  // active new item
  items[itemActive].classList.add("active");
  thumbnails[itemActive].classList.add("active");
  setPositionThumbnail();

  // clear auto time run slider
  clearInterval(refreshInterval);
  refreshInterval = setInterval(() => {
    next.click();
  }, 9000);
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    itemActive = index;
    showSlider();
  });
});

let slideIndex = 0;

function showSlides() {
  const slides = document.querySelector(".slides");
  const totalSlides = slides.children.length;
  if (slideIndex >= totalSlides) {
    slideIndex = 0;
  }
  if (slideIndex < 0) {
    slideIndex = totalSlides - 1;
  }
  slides.style.transform = `translateX(${-slideIndex * 220}px)`; // 220px هي عرض الصورة مع الهوامش
}

function moveSlides(n) {
  slideIndex += n;
  showSlides();
}

// عرض الشرائح الأولى عند تحميل الصفحة
window.onload = showSlides;

document.querySelectorAll(".city-button, .event-button").forEach((button) => {
  button.addEventListener("click", function () {
    this.classList.toggle("active");
  });
});
