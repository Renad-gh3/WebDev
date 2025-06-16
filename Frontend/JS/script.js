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

  // about us page
  const video = document.getElementById("bg-video");
  const playBtn = document.getElementById("toggle-play");
  const muteBtn = document.getElementById("toggle-mute");
  const progressBar = document.getElementById("progress-bar");

  const playIcon = document.getElementById("play-icon");
  const pauseIcon = document.getElementById("pause-icon");
  const muteIcon = document.getElementById("mute-icon");
  const unmuteIcon = document.getElementById("unmute-icon");

  playBtn.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      playIcon.style.display = "none";
      pauseIcon.style.display = "inline";
    } else {
      video.pause();
      playIcon.style.display = "inline";
      pauseIcon.style.display = "none";
    }
  });

  muteBtn.addEventListener("click", () => {
    video.muted = !video.muted;
    muteIcon.style.display = video.muted ? "inline" : "none";
    unmuteIcon.style.display = video.muted ? "none" : "inline";
  });

  video.addEventListener("timeupdate", () => {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.value = percent;
  });

  progressBar.addEventListener("input", () => {
    const newTime = (progressBar.value / 100) * video.duration;
    video.currentTime = newTime;
  });
});

let items = document.querySelectorAll(".slider .list .item");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let thumbnails = document.querySelectorAll(".thumbnail .item");

let countItem = items.length;
let itemActive = 0;

next.onclick = function () {
  itemActive = itemActive + 1;
  if (itemActive >= countItem) {
    itemActive = 0;
  }
  showSlider();
};

prev.onclick = function () {
  itemActive = itemActive - 1;
  if (itemActive < 0) {
    itemActive = countItem - 1;
  }
  showSlider();
};

let refreshInterval = setInterval(() => {
  next.click();
}, 9000);
function showSlider() {
  let itemActiveOld = document.querySelector(".slider .list .item.active");
  let thumbnailActiveOld = document.querySelector(".thumbnail .item.active");
  itemActiveOld.classList.remove("active");
  thumbnailActiveOld.classList.remove("active");

  items[itemActive].classList.add("active");
  thumbnails[itemActive].classList.add("active");
  setPositionThumbnail();

  clearInterval(refreshInterval);
  refreshInterval = setInterval(() => {
    next.click();
  }, 9000);
}

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
  slides.style.transform = `translateX(${-slideIndex * 220}px)`;
}

function moveSlides(n) {
  slideIndex += n;
  showSlides();
}

window.onload = showSlides;

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

setupScroll("buttons-container");

document.querySelectorAll(".city-button, .event-button").forEach((button) => {
  button.addEventListener("click", function () {
    this.classList.toggle("active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
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
