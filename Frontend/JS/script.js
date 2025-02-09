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
