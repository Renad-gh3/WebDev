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
  });
  
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const blogCard = this.closest(".blog-card");
      if (blogCard) {
        blogCard.remove();
      }
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

      blogCard.addEventListener("click", (e) => {
        if (e.target.classList.contains('delete-button')) {
          return;
        }
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
         <button class="delete-button" data-id="${post._id}">حذف</button>
      </div>
      </div>
      `;
  
      blogGrid.appendChild(blogCard);
    });

    setupDeleteButtons();
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
  
    function setupDeleteButtons() {
      const deleteButtons = document.querySelectorAll(".delete-button");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", async function (e) {
          e.stopPropagation(); // منع الانتشار لمنع فتح التفاصيل
          const postId = this.getAttribute("data-id");
          if (confirm("هل أنت متأكد من حذف هذه المدونة؟")) {
            try {
              const response = await fetch(`http://localhost:5000/api/post/${postId}`, {
              method: "DELETE"
          });
                
            if (response.ok) {
              this.closest(".blog-card").remove();
            } else {
              alert("حدث خطأ أثناء محاولة الحذف");
            }
          } catch (error) {
              console.error("Error deleting post:", error);
            alert("حدث خطأ أثناء الاتصال بالخادم");
          }
        }
      });
    });
  }
  loadBlogs();
});
  