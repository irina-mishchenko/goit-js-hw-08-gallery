"use strict";

import images from './gallery-items.js';

const gallery = document.querySelector(".js-gallery");
gallery.addEventListener("click", handleGalleryClick);

const closeModalBtn = document.querySelector(`[data-action="close-lightbox"]`);
const lightbox = document.querySelector(".js-lightbox");
closeModalBtn.addEventListener("click", handleCloseModal);

const biggerImage = document.querySelector(".lightbox__image");
const overlay = document.querySelector(".lightbox__content");
overlay.addEventListener("click", handleCloseModal);

createGallery(images);

function createGallery(images) {
    images.forEach(image => {
    let li = document.createElement("li");

    li.insertAdjacentHTML(
      "afterbegin",
      `<a
          class="gallery__link"
          href="${image.original}"
        >
          <img
            class="gallery__image"
            src="${image.preview}"
            data-source="${image.original}"
            alt="${image.description}"
          />
        </a>`
    );
    gallery.append(li);
  });
}

function handleGalleryClick(event) {
  event.preventDefault();
  window.addEventListener("keydown", handleKeyPress);
  biggerImage.src = event.target.dataset.source;
  biggerImage.alt = event.target.alt;
  lightbox.classList.add("is-open");
}

function handleCloseModal(event) {
  if (event.target != event.currentTarget) {
    return;
  }
  window.removeEventListener("keydown", handleKeyPress);
  lightbox.classList.remove("is-open");
  biggerImage.src = "";
  biggerImage.alt = "";
}

function handleKeyPress(event) {
  if (event.code != "Escape") {
    return;
  }

  lightbox.classList.remove("is-open");
  biggerImage.src = "";
  biggerImage.alt = "";
}
