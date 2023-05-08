/******************************************
/* IMAGE GALLERY HERO WITH THUMBS
/*******************************************/

function createImageGallery(thumbsContainerId, currentImageId, descriptionId, imageFiles, includeDescriptions, autoCycle) {
  const imageThumbs = document.getElementById(thumbsContainerId);
  const currentImage = document.getElementById(currentImageId);
  const description = document.getElementById(descriptionId);


  const descriptions = [
  '<span>My newest short film, “Butt Stuff,” raised 124% of its original goal during its Seed&Spark crowdfunding campaign! You can still follow along by clicking here:<br><br><a href="https://seedandspark.com/fund/butt-stuff#story" target="_blank">Butt Stuff on Seed&Spark!</a></span>',
  '<span>I star as Newbie/Viola in the D&D webseries "The Party," whose 1st season features Ally Beardsley, Becca Scott, Vince Caso from The Guild. All episodes are now available on YouTube!<br><br><a href="https://www.youtube.com/watch?v=mLMrE2Im9vw" target="_blank">Watch Episode 1 here!</a></span>',  
  '<span>“Pulling the Plug on Mom” continues its festival run, most recently getting a nomination for Best Comedy at Cannes Shorts!<br><br><a href="#">Go to Page</span>',
  '<span>My first film, “this is a garden,” is now on YouTube with 31,000 views and counting! You can watch it here:<br><br><a href="https://www.youtube.com/watch?v=b4eXILF8CIE" target="_blank">"this is a garden"</a></span>',
  '<span>I voice Blair in the new D&D series “Caves & Creatures.” <br><br><a href="https://www.youtube.com/watch?v=D_3In7YQP2U" target="_blank">Watch Season 1 Episode 1 Equal Opportunity Cannibal</a></span>',
  '<span>Catch me as the voice of Selkie the playful mermaid in the narrative podcast “Venice Magic Shop!”<br><br><a href="https://open.spotify.com/episode/5F4tMaIzsVWtgYy8D4L9pz?si=8bb2e037589544a1&nd=1" target="_blank">Now On Spotify!</a></span>'
];

  for (let i = 0; i < imageFiles.length; i++) {
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
        currentImage.dataset.description = this.dataset.description;
        description.innerHTML = this.dataset.description;
      }
    });
  }

  if (includeDescriptions) {
    currentImage.dataset.description = descriptions[0]; 

    currentImage.addEventListener("mouseenter", function () {
      if (this.dataset.description) {
        description.innerHTML = this.dataset.description;
        description.classList.remove("hidden");
        description.style.height = `${currentImage.clientHeight}px`;
      }
    });
  
    currentImage.addEventListener("mouseleave", function () {
      description.classList.add("hidden");
    });
  }
  
  function isMobileDevice() {
    return window.innerWidth <= 767;
  }
  

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
        currentImage.dataset.description = thumb.dataset.description; 
  
        if (isMobileDevice()) {
          description.innerHTML = thumb.dataset.description;
        }
  
        currentImage.addEventListener("load", () => {
          currentImage.classList.remove("fade-out");
          currentImage.classList.add("fade-in");
  
          setTimeout(() => {
            currentImage.classList.remove("fade-in");
          }, 400); 
        }, { once: true });
      }, 400);
    }, 7000); 
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
              "images/indeximages/image6.webp",
              "images/indeximages/image5.webp",
              "images/indeximages/image4.webp",
              "images/indeximages/image3.webp",
              "images/indeximages/image2.webp"
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
              "images/films/buttprod/buttbts8.webp"
            ],
            false, // includeDescriptions
            true // autoCycle
          );
        });

        document.addEventListener("DOMContentLoaded", () => {
          createImageGallery(
            "norm-thumbs",
            "current-norm-image",
            "description",
            [
              "images/films/normprod/norman.webp",
              "images/films/normprod/norman2.webp",
              "images/films/normprod/norman3.webp",
              "images/films/normprod/norman4.webp",
              "images/films/normprod/norman5.webp",
              "images/films/normprod/norman6.webp",
              "images/films/normprod/norman7.webp",
              "images/films/normprod/norman8.webp",
            ],
            false, // includeDescriptions
            true // autoCycle
          );
        });

        document.addEventListener("DOMContentLoaded", () => {
          createImageGallery(
            "garden-thumbs",
            "current-garden-image",
            "description",
            [
              "images/films/gardenprod/gardenprod.webp",
              "images/films/gardenprod/gardenprod1.webp",
              "images/films/gardenprod/gardenprod2.webp",
              "images/films/gardenprod/gardenprod3.webp",
              "images/films/gardenprod/gardenprod4.webp",
              "images/films/gardenprod/gardenprod5.webp",
              "images/films/gardenprod/gardenprod6.webp",
              "images/films/gardenprod/gardenprod7.webp",
              "images/films/gardenprod/gardenprod8.webp",
              "images/films/gardenprod/gardenprod9.webp"
            ],
            false, // includeDescriptions
            true // autoCycle
          );
        });

        document.addEventListener("DOMContentLoaded", () => {
          createImageGallery(
            "garden-bts-thumbs",
            "current-garden-bts-image",
            "description",
            [
              "images/films/gardenprod/gardenbts (1).webp",
              "images/films/gardenprod/gardenbts (2).webp",
              "images/films/gardenprod/gardenbts (3).webp",
              "images/films/gardenprod/gardenbts (4).webp",
              "images/films/gardenprod/gardenbts (5).webp",
              "images/films/gardenprod/gardenbts (6).webp",
              "images/films/gardenprod/gardenbts (7).webp",
              "images/films/gardenprod/gardenbts (8).webp",
              "images/films/gardenprod/gardenbts (9).webp"
            ],
            false, // includeDescriptions
            true // autoCycle
          );
        });


        document.addEventListener("DOMContentLoaded", () => {
          createImageGallery(
            "plug-thumbs",
            "current-plug-image",
            "description",
            [
              "images/films/plugprod/pullingtheplugprod (1).webp",
              "images/films/plugprod/pullingtheplugprod (2).webp",
              "images/films/plugprod/pullingtheplugprod (3).webp",
              "images/films/plugprod/pullingtheplugprod (4).webp",
              "images/films/plugprod/pullingtheplugprod (5).webp",
              "images/films/plugprod/pullingtheplugprod (6).webp",
              "images/films/plugprod/pullingtheplugprod (7).webp",
              "images/films/plugprod/pullingtheplugprod (8).webp",
              "images/films/plugprod/pullingtheplugprod (9).webp",
              "images/films/plugprod/pullingtheplugprod (10).webp"
            ],
            false, // includeDescriptions
            true // autoCycle
          );
        });
        
        
/******************************************
/* SCROLLING THUMBNAILS
/*******************************************/

function createScrollFunctionality(scrollLeftId, scrollRightId, thumbContainerId) {
  const scrollLeft = document.getElementById(scrollLeftId);
  const scrollRight = document.getElementById(scrollRightId);
  const thumbContainer = document.getElementById(thumbContainerId);

  function moveFirstToLast() {
    const firstChild = thumbContainer.firstChild;
    thumbContainer.removeChild(firstChild);
    thumbContainer.appendChild(firstChild);
  }

  function moveLastToFirst() {
    const lastChild = thumbContainer.lastChild;
    thumbContainer.removeChild(lastChild);
    thumbContainer.insertBefore(lastChild, thumbContainer.firstChild);
  }

  scrollLeft.addEventListener("click", () => {
    moveLastToFirst();
    thumbContainer.scrollBy({ top: 0, left: -300, behavior: "smooth" });
    thumbContainer.scrollBy({ top: 0, left: -300, behavior: "smooth" });
  });

  scrollRight.addEventListener("click", () => {
    moveFirstToLast();
    thumbContainer.scrollBy({ top: 0, left: 300, behavior: "smooth" });
    thumbContainer.scrollBy({ top: 0, left: 300, behavior: "smooth" });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  createScrollFunctionality("scroll-norm-left", "scroll-norm-right", "norm-thumbs");
});
document.addEventListener("DOMContentLoaded", () => {
  createScrollFunctionality("scroll-butt-left", "scroll-butt-right", "butt-thumbs");
});
document.addEventListener("DOMContentLoaded", () => {
  createScrollFunctionality("scroll-index-left", "scroll-index-right", "image-thumbs");
});
document.addEventListener("DOMContentLoaded", () => {
  createScrollFunctionality("scroll-butt-bts-left", "scroll-butt-bts-right", "butt-bts-thumbs");
});
document.addEventListener("DOMContentLoaded", () => {
  createScrollFunctionality("scroll-garden-left", "scroll-garden-right", "garden-thumbs");
});
document.addEventListener("DOMContentLoaded", () => {
  createScrollFunctionality("scroll-garden-bts-left", "scroll-garden-bts-right", "garden-bts-thumbs");
});
document.addEventListener("DOMContentLoaded", () => {
  createScrollFunctionality("scroll-plug-left", "scroll-plug-right", "plug-thumbs");
});
             
/******************************************
/* LIGHTBOX
/*******************************************/

document.addEventListener("DOMContentLoaded", () => {
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

  document.querySelectorAll(".lightbox-image").forEach(lightboxImage => {
    addLightboxListener(lightboxImage);
  });
});

/******************************************
/* DROPDOWN ON CLICK
/*******************************************/

document.addEventListener('DOMContentLoaded', () => {
  const dropdowns = document.querySelectorAll('.dropdown');
  const dropdownMenus = document.querySelectorAll('.dropdown-menu');

  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', () => {
      const dropdownMenu = dropdown.querySelector('.dropdown-menu');
      const wasVisible = dropdownMenu.style.display === 'block';
      
      // Hide all dropdown menus
      dropdownMenus.forEach(dropdownMenu => {
        dropdownMenu.style.display = 'none';
      });

      // Toggle the clicked dropdown menu's visibility
      dropdownMenu.style.display = wasVisible ? 'none' : 'block';
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      dropdownMenus.forEach(dropdownMenu => {
        dropdownMenu.style.display = 'none';
      });
    }
  });
});



document.addEventListener("DOMContentLoaded", function () {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const menu = document.querySelector(".menu");

  hamburgerMenu.addEventListener("click", function () {
    menu.classList.toggle("show");
  });

  const dropdowns = document.querySelectorAll(".dropdown > a");
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", function () {
      const submenu = this.nextElementSibling;
      submenu.classList.toggle("show");
    });
  });
});
