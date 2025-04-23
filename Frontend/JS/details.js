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

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    if (!postId) throw new Error("لم يتم تحديد المنشور");

    const response = await fetch(`http://localhost:5000/api/post/${postId}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "فشل في جلب البيانات");
    }

    const post = await response.json();

    document.getElementById("title").textContent = post.title;
    document.getElementById(
      "main-image"
    ).src = `http://localhost:5000/${post.image}`;
    document.getElementById("city").textContent = post.city;
    document.getElementById("activityType").textContent = post.activityType;
    document.getElementById("content").textContent = post.content;

    const date = new Date(post.createdAt).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    document.getElementById("date").textContent = date;
  } catch (err) {
    console.error("Error:", err);
    alert(err.message);
  }
});
