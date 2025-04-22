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
// دالة التمرير
function setupScroll(containerClass) {
  const containers = document.querySelectorAll(`.${containerClass}`);

  containers.forEach((container) => {
    const scrollButtons = container.querySelector(".scroll-buttons");
    const leftArrow = container.querySelector(".left-arrow");
    const rightArrow = container.querySelector(".right-arrow");

    leftArrow.addEventListener("click", () => {
      scrollButtons.scrollBy({ left: -200, behavior: "smooth" });
    });

    rightArrow.addEventListener("click", () => {
      scrollButtons.scrollBy({ left: 200, behavior: "smooth" });
    });
  });
}

// تهيئة التمرير
setupScroll("buttons-container");

// تفعيل/تعطيل الأزرار
document.querySelectorAll(".city-button, .event-button").forEach((button) => {
  button.addEventListener("click", function () {
    this.classList.toggle("active");
  });
});

// ################################################
document.addEventListener("DOMContentLoaded", function () {
  // وظائف جديدة لجلب البيانات وعرضها
  async function fetchBlogs() {
    try {
      const response = await fetch("http://localhost:5000/api/post");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  function renderBlogCards(posts) {
    const blogGrid = document.getElementById("blogGrid");
    blogGrid.innerHTML = "";

    posts.forEach((post) => {
      const blogCard = document.createElement("div");
      blogCard.className = "blog-card";

      // إضافة حدث النقر لفتح التفاصيل
      blogCard.addEventListener("click", () => {
        window.location.href = `details.html?id=${post._id}`;
      });

      const date = new Date(post.createdAt).toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      blogCard.innerHTML = `
      <div class="image-container">
        <img src="http://localhost:5000/${post.image}" width="260" height="260" alt="صورة المدونة">
        <div class="date-sticker">${date}</div>
        <img src="../Media/saudistyle.png" alt="saudi style">
      </div>
      <div class="details">
        <p>${post.city} | ${post.activityType} <i class="fa-solid fa-location-dot"></i></p>
        <h3>${post.title}</h3>
      </div>
    `;

      blogGrid.appendChild(blogCard);
    });
  }

  async function loadBlogs() {
    const blogGrid = document.getElementById("blogGrid");

    // عرض Skeleton أثناء التحميل
    blogGrid.innerHTML = `
    <div class="skeleton-loader">
      <div class="skeleton-image"></div>
      <div class="skeleton-details">
        <div class="skeleton-line short"></div>
        <div class="skeleton-line medium"></div>
      </div>
    </div>
  `.repeat(4);

    const posts = await fetchBlogs();
    renderBlogCards(posts);
  }

  loadBlogs();
});
