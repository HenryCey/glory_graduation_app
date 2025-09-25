// static/js/gallery.js
document.addEventListener("DOMContentLoaded", () => {
  const galleryImages = document.querySelectorAll(".gallery-grid img");
  const lightbox = document.getElementById("lightbox");
  if (!galleryImages.length || !lightbox) {
    console.warn("Gallery or lightbox not found. Check selectors and gallery.html.");
    return;
  }

  const lightboxImg = lightbox.querySelector(".lightbox-content");
  const closeBtn = lightbox.querySelector(".close");
  const prevBtn = lightbox.querySelector(".prev");
  const nextBtn = lightbox.querySelector(".next");

  let currentIndex = 0;
  let lightboxOpen = false;

  // Guard: ensure elements exist
  if (!lightboxImg || !closeBtn || !prevBtn || !nextBtn) {
    console.warn("Lightbox structure incomplete. Required elements missing.");
    return;
  }

  function openLightbox(index) {
    currentIndex = index;
    showImage(currentIndex);
    lightbox.classList.add("active");
    lightboxOpen = true;
    // disable page scroll while open
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    lightboxOpen = false;
    document.body.style.overflow = ""; // restore scrolling
  }

  function showImage(index) {
    if (index < 0) index = galleryImages.length - 1;
    if (index >= galleryImages.length) index = 0;
    currentIndex = index;

    // small fade/zoom effect:
    lightboxImg.style.opacity = 0;
    setTimeout(() => {
      lightboxImg.src = galleryImages[currentIndex].getAttribute("src");
      lightboxImg.onload = () => {
        lightboxImg.style.opacity = 1;
        lightboxImg.style.transform = "scale(1.03)";
        setTimeout(() => { lightboxImg.style.transform = "scale(1)"; }, 160);
      };
    }, 100);
  }

  function nextImage() {
    showImage((currentIndex + 1) % galleryImages.length);
  }
  function prevImage() {
    showImage((currentIndex - 1 + galleryImages.length) % galleryImages.length);
  }

  // attach clicks
  galleryImages.forEach((img, idx) => {
    img.addEventListener("click", (e) => {
      e.preventDefault();
      openLightbox(idx);
    });
  });

  // UI controls
  closeBtn.addEventListener("click", closeLightbox);
  nextBtn.addEventListener("click", nextImage);
  prevBtn.addEventListener("click", prevImage);

  // close click outside image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // keyboard navigation only when open
  document.addEventListener("keydown", (e) => {
    if (!lightboxOpen) return;
    if (e.key === "ArrowRight") nextImage();
    else if (e.key === "ArrowLeft") prevImage();
    else if (e.key === "Escape") closeLightbox();
  });

  // touch swipe
  let touchStartX = 0;
  lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });
  lightbox.addEventListener("touchend", (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) < 40) return; // ignore tiny moves
    if (diff > 0) prevImage();
    else nextImage();
  });
});
