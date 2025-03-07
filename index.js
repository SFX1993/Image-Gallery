const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("search-Input");
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const closeModal = document.getElementById("close-modal");

const API_KEY = "";

async function fetchImages(query = "") {
  gallery.innerHTML = "Loading...";
  let url = `https://api.unsplash.com/photos/random?count=12&client_id=${API_KEY}`;
  if (query) {
    url = `https://api.unsplash.com/search/photos?query=${query}&per_page=12&client_id=${API_KEY}`;
  }
  try {
    const response = await fetch(url);
    const data = await response.json();
    const images = query ? data.results : data;
    displayImages(images);
  } catch (error) {
    gallery.innerHTML = `<p>Error:${error.message}</p>`;
  }
}
function displayImages(images) {
  gallery.innerHTML = "";
  images.forEach((img) => {
    const imageElement = document.createElement("img");
    imageElement.src = img.urls.small;
    imageElement.alt = img.alt.description || "image";
    imageElement.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImage.src = img.urls.regular;
    });
    gallery.appendChild(imageElement);
  });
}
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const query = searchInput.ariaValueMax.trim();
    fetchImages(query);
  }
});
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});
fetchImages();
