/******************************************
/* HOME PAGE CURRENT PROJECTS GALLERY
/*******************************************/

document.addEventListener("DOMContentLoaded", () => {
  const imageThumbs = document.getElementById("image-thumbs");
  const currentImage = document.getElementById("current-image");
  const description = document.getElementById("description");

  const descriptions = [
      '<span>My newest short film, “Butt Stuff,” raised 124% of its original goal during its Seed&Spark crowdfunding campaign! You can still follow along by clicking here:<br><br><a href="https://seedandspark.com/fund/butt-stuff#story">Butt Stuff on Seed&Spark!</a></span>',
      '<span>Catch me as the voice of Selkie the playful mermaid in the narrative podcast “Venice Magic Shop!”<br><br><a href="https://open.spotify.com/episode/5F4tMaIzsVWtgYy8D4L9pz?si=8bb2e037589544a1&nd=1">Now On Spotify!</a></span>',
      '<span>I voice Blair in the new D&D series “Caves & Creatures.” <br><br><a href="https://www.youtube.com/watch?v=D_3In7YQP2U">Watch Season 1 Episode 1 Equal Opportunity Cannibal</a></span>',
      '<span>My first film, “this is a garden,” is now on YouTube with 31,000 views and counting! You can watch it here:<br><br><a href="https://www.youtube.com/watch?v=b4eXILF8CIE">"this is a garden"</a></span>',
      '<span>“Pulling the Plug on Mom” continues its festival run, most recently getting a nomination for Best Comedy at Cannes Shorts!<br><br><a href="#">Go to Page</a></span>',
  ];

  for (let i = 1; i <= 5; i++) {
      const thumb = document.createElement("img");
      thumb.src = `images/indeximages/image${i}.webp`;
      thumb.alt = `Image ${i}`;
      thumb.dataset.description = descriptions[i - 1];

      thumb.classList.add("thumb");
      imageThumbs.appendChild(thumb);

      thumb.addEventListener("click", function () {
          currentImage.src = this.src;
          currentImage.alt = this.alt;
          description.innerHTML = this.dataset.description;
          description.classList.remove("hidden");
          description.style.height = `${currentImage.clientHeight}px`;
      });
  }

  currentImage.addEventListener("load", () => {
      description.style.height = `${currentImage.clientHeight}px`;
  });

  description.innerHTML = descriptions[0];

  currentImage.addEventListener("mouseover", () => {
      description.classList.remove("hidden");
  });

  currentImage.addEventListener("mouseout", () => {
      description.classList.add("hidden");
  });

    function cycleImages() {
      let currentIndex = 1;
  
      return setInterval(() => {
          currentImage.classList.add("fade-out");
  
          setTimeout(() => {
              currentIndex++;
              if (currentIndex > 5) {
                  currentIndex = 1;
              }
              const thumb = document.querySelector(`.thumb:nth-child(${currentIndex})`);
              currentImage.src = thumb.src;
              currentImage.alt = thumb.alt;
              description.innerHTML = thumb.dataset.description;
              description.style.height = `${currentImage.clientHeight}px`;
  
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
  

  let cyclingInterval = cycleImages();

  currentImage.addEventListener("mouseover", () => {
      clearInterval(cyclingInterval);
  });

  currentImage.addEventListener("mouseout", () => {
      cyclingInterval = cycleImages();
  });
});

/******************************************
/* LIGHTBOX FUNCTIONALITY
/*******************************************/


const headshots = document.querySelectorAll(".headshot");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

headshots.forEach(headshot => {
    headshot.addEventListener("click", () => {
        lightboxImg.src = headshot.src;
        lightboxImg.alt = headshot.alt;
        lightbox.classList.remove("hidden");
    });
});

lightbox.addEventListener("click", () => {
    lightbox.classList.add("hidden");
});
