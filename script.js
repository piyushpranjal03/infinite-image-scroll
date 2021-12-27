const apiKey = "OnL4E6LDC6wzTUMw4nWH5PW_f7mYhR_hhCKxqwXAvHc";
const count = 5;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
const imageContainer = document.querySelector(".image-container");
const loader = document.querySelector(".loader");

let ready = false;
let totalImages = 0;
let loadedImages = 0;

function imagesLoaded() {
  loadedImages++;
  if (loadedImages === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Array to store retrieved photos data from API
let photosArray = [];

// Setting attributes for element by taking element and attributes as an object
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Adding retrieved photos to DOM
function displayPhotos() {
  // Resetting the loaded images variable to 0
  loadedImages = 0;
  // Counting the total images
  totalImages = photosArray.length;
  photosArray.forEach(photo => {
    // Creating an anchor tag
    const item = document.createElement("a");
    setAttributes(item, { href: photo.links.html, target: "_blank" });

    const image = document.createElement("img");
    setAttributes(image, { src: photo.urls.regular, alt: photo.description, title: photo.description });

    // Adding img tag inside anchor tag and then adding it to the image container
    item.append(image);

    // Checking whether all the images are loaded inside dom or not
    image.addEventListener("load", imagesLoaded);

    imageContainer.append(item);
  });
}

// Get photos function
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    // Displaying retrieved photos
    displayPhotos();
  } catch (error) {
    console.log("Something went wrong!", error);
  }
}

// Loading more photo when the user almost scroll to the bottom and 1000 px above
// Adding event listener to the window object which has the scroll property
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

// Calling function
getPhotos();
