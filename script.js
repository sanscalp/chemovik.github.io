// Fade-in on page load
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = 0;
  setTimeout(() => {
    document.body.style.transition = "opacity 1s ease-in";
    document.body.style.opacity = 1;
  }, 100);
});