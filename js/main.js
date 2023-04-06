

// Get the hero and thumbnail images
const heroImg = document.querySelector('.hero img');
const thumbnailImgs = document.querySelectorAll('.thumbnail img');

// Set click listeners for thumbnail images
thumbnailImgs.forEach((img) => {
  img.addEventListener('click', () => {
    heroImg.src = img.src;
  });
});

// Set click listener for hero image
heroImg.addEventListener('click', () => {
  // Get the index of the current image in the thumbnail images
  let currentIndex;
  for (let i = 0; i < thumbnailImgs.length; i++) {
    if (thumbnailImgs[i].src === heroImg.src) {
      currentIndex = i;
      break;
    }
  }
  // Get the next image in the thumbnail images
  const nextIndex = (currentIndex + 1) % thumbnailImgs.length;
  const nextImg = thumbnailImgs[nextIndex];
  // Set the hero image to the next image
  heroImg.src = nextImg.src;
});


const thumbnailsContainer = document.querySelector('.thumbnails-container');
const thumbnails = document.querySelector('.thumbnails');

thumbnailImgs.forEach((img) => {
  img.addEventListener('click', () => {
    const scrollWidth = thumbnails.scrollWidth - thumbnailsContainer.clientWidth;
    const imgIndex = Array.from(thumbnailImgs).indexOf(img);
    const imgWidth = img.offsetWidth;
    const imgOffset = imgIndex * (imgWidth + 10);
    thumbnailsContainer.scrollTo({
      left: Math.min(imgOffset, scrollWidth),
      behavior: 'smooth',
    });
  });
});



