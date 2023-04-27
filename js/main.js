/******************************************
/* IMAGE GALLERY HERO WITH THUMBS
/*******************************************/

function createImageGallery(thumbsContainerId, currentImageId, descriptionId, imageFiles, includeDescriptions, autoCycle) {  
  console.log('Creating image gallery for:', thumbsContainerId);
  
  const imageThumbs = document.getElementById(thumbsContainerId);
  const currentImage = document.getElementById(currentImageId);
  const description = document.getElementById(descriptionId);

  const descriptions = ['<span>My newest short film, “Butt Stuff,” raised 124% of its original goal during its Seed&Spark crowdfunding campaign! You can still follow along by clicking here:<br><br><a href="https://seedandspark.com/fund/butt-stuff#story">Butt Stuff on Seed&Spark!</a></span>',
  '<span>Catch me as the voice of Selkie the playful mermaid in the narrative podcast “Venice Magic Shop!”<br><br><a href="https://open.spotify.com/episode/5F4tMaIzsVWtgYy8D4L9pz?si=8bb2e037589544a1&nd=1">Now On Spotify!</a></span>',
  '<span>I voice Blair in the new D&D series “Caves & Creatures.” <br><br><a href="https://www.youtube.com/watch?v=D_3In7YQP2U">Watch Season 1 Episode 1 Equal Opportunity Cannibal</a></span>',
  '<span>My first film, “this is a garden,” is now on YouTube with 31,000 views and counting! You can watch it here:<br><br><a href="https://www.youtube.com/watch?v=b4eXILF8CIE">"this is a garden"</a></span>',
  '<span>“Pulling the Plug on Mom” continues its festival run, most recently getting a nomination for Best Comedy at Cannes Shorts!<br><br><a href="#">Go to Page</a></span>'];

  for (let i = 0; i < imageFiles.length; i++) {
    console.log('Adding thumb:', i);

    const thumb = document.createElement("img");
    thumb.src = imageFiles[i];
    thumb.alt = `Image ${i + 1}`;
    thumb.dataset.description = descriptions[i];

    thumb.classList.add("thumb");
    imageThumbs.appendChild(thumb);

    thumb.addEventListener("click", function () {
      currentImage.src = this.src;
      currentImage.alt = this.alt;

      if (includeDescriptions) {
        description.innerHTML = this.dataset.description;
        description.classList.remove("hidden");
        description.style.height = `${currentImage.clientHeight}px`;
      }
    });
  }

/******************************************
/* GALLERY IMAGE CYCLING
/*******************************************/

    function cycleImages() {
      let currentIndex = 1;
  
      return setInterval(() => {
        currentImage.classList.add("fade-out");
  
        setTimeout(() => {
          currentIndex++;
          if (currentIndex > imageFiles.length) {
            currentIndex = 1;
          }
          const thumb = document.querySelector(`#${thumbsContainerId} .thumb:nth-child(${currentIndex})`);
          currentImage.src = thumb.src;
          currentImage.alt = thumb.alt;
  
          currentImage.addEventListener("load", () => {
            currentImage.classList.remove("fade-out");
            currentImage.classList.add("fade-in");
  
            setTimeout(() => {
              currentImage.classList.remove("fade-in");
            }, 300); // Match the duration of the fadeIn CSS
          }, { once: true });
        }, 300); // Match the duration of the fadeOut CSS
      }, 5000); // Change the delay between image changes
    }
  
    if (autoCycle) {
      let cyclingInterval = cycleImages(currentImageId, imageFiles);
  
      currentImage.addEventListener("mouseover", () => {
        clearInterval(cyclingInterval);
      });
  
      currentImage.addEventListener("mouseout", () => {
        cyclingInterval = cycleImages(currentImageId, imageFiles);
      });
    }
  }

/******************************************
/* GALLERY CREATION
/*******************************************/
    
        document.addEventListener("DOMContentLoaded", () => {
          createImageGallery(
            "image-thumbs",
            "current-image",
            "description",
            [
              "images/indeximages/image1.webp",
              "images/indeximages/image2.webp",
              "images/indeximages/image3.webp",
              "images/indeximages/image4.webp",
              "images/indeximages/image5.webp"
            ],
            true, // includeDescriptions
            true // autoCycle
          );
        });

        document.addEventListener("DOMContentLoaded", () => {
          createImageGallery(
            "butt-thumbs",
            "current-butt-image",
            "description",
            [
              "images/films/buttprod/aftercare.webp",
              "images/films/buttprod/angryreadingnoises.webp",
              "images/films/buttprod/introducingcassie.webp",
              "images/films/buttprod/jasonandelena.webp",
              "images/films/buttprod/jasonbouttogetit.webp",
              "images/films/buttprod/postsexbutmakeitsad.webp",
              "images/films/buttprod/postsexface.webp",
              "images/films/buttprod/withthatbuttagain.webp"
            ],
            false, // includeDescriptions
            true // autoCycle
          );
        });

        document.addEventListener("DOMContentLoaded", () => {
          createImageGallery(
            "butt-bts-thumbs",
            "current-butt-bts-image",
            "description",
            [
              "images/films/buttprod/buttbts.webp",
              "images/films/buttprod/buttbts1.webp",
              "images/films/buttprod/buttbts2.webp",
              "images/films/buttprod/buttbts3.webp",
              "images/films/buttprod/buttbts4.webp",
              "images/films/buttprod/buttbts5.webp",
              "images/films/buttprod/buttbts6.webp",
              "images/films/buttprod/buttbts7.webp",
              "images/films/buttprod/buttbts8.webp",
              "images/films/buttprod/buttbts9.webp"
            ],
            false, // includeDescriptions
            true // autoCycle
          );
        });

/******************************************
/* SCROLLING THUMBNAILS
/*******************************************/

        document.addEventListener("DOMContentLoaded", () => {
          const bindScrollEvents = (scrollLeftId, scrollRightId, thumbContainerId) => {
            const scrollLeft = document.getElementById(scrollLeftId);
            const scrollRight = document.getElementById(scrollRightId);
            const thumbContainer = document.getElementById(thumbContainerId);
        
            scrollLeft.addEventListener("click", () => {
              thumbContainer.scrollBy({ top: 0, left: -300, behavior: "smooth" });
            });
        
            scrollRight.addEventListener("click", () => {
              thumbContainer.scrollBy({ top: 0, left: 300, behavior: "smooth" });
            });
          };
        
          bindScrollEvents("scroll-left", "scroll-right", "butt-thumbs");
          bindScrollEvents("scroll-left", "scroll-right", "image-thumbs");
          bindScrollEvents("scroll-bts-left", "scroll-bts-right", "butt-bts-thumbs");
        });
             
/******************************************
/* LIGHTBOX
/*******************************************/

document.addEventListener("DOMContentLoaded", () => {
  const currentButtBTSImage = document.getElementById("current-butt-bts-image");
  const currentButtImage = document.getElementById("current-butt-image");
  const headshots = document.querySelectorAll(".headshot");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  function addLightboxListener(imageElement) {
    imageElement.addEventListener("click", () => {
      lightboxImg.src = imageElement.src;
      lightboxImg.alt = imageElement.alt;
      lightbox.classList.remove("hidden");
    });
  }  
  
  lightbox.addEventListener("click", () => {
    lightbox.classList.add("hidden");
  });

  headshots.forEach(headshot => {
    addLightboxListener(headshot);
  });

  addLightboxListener(currentButtImage);
  addLightboxListener(currentButtBTSImage);
});