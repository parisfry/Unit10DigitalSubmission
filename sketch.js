


document.addEventListener("DOMContentLoaded", () => {

  const lightbox = document.getElementById("lightbox");
  const lightboxVideo = document.getElementById("lightbox-video");
  const lightboxCaption = document.getElementById("lightbox-caption");

  let lightboxImage = document.createElement("img");
  lightboxImage.style.maxWidth = "90vw";
  lightboxImage.style.maxHeight = "90vh";
  lightboxImage.style.display = "none";
  lightbox.appendChild(lightboxImage);

  document.querySelectorAll(".video-item, .carousel video, .carousel img, .video-pair video").forEach(item => {

    item.addEventListener("click", () => {

      let videoSrc = "";
      let imageSrc = "";
      let caption = "";

      if (item.tagName === "VIDEO") {
        videoSrc = item.currentSrc;
      }
      if (item.querySelector("canvas")) return;

      else if (item.tagName === "IMG") {
        imageSrc = item.src;
      }
      else if (item.classList.contains("video-item")) {
        const video = item.querySelector("video");
        const img = item.querySelector("img");
        if (video) videoSrc = video.currentSrc;
        if (img) imageSrc = img.src;
        caption = item.querySelector(".video-caption")?.textContent || "";
      }

      lightboxVideo.style.display = "none";
      lightboxImage.style.display = "none";

      if (videoSrc) {
        lightboxVideo.src = videoSrc;
        lightboxVideo.muted = true;
        lightboxVideo.style.display = "block";
        lightboxVideo.play();
      }

      if (imageSrc) {
        lightboxImage.src = imageSrc;
        lightboxImage.style.display = "block";
      }

      lightboxCaption.textContent = caption;
      lightbox.classList.add("active");
    });
  });

  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("active");
    lightboxVideo.pause();
    lightboxVideo.src = "";
    lightboxImage.src = "";
  });
});