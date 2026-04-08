/* =============================================
   NEWS CAROUSEL — carousel.js
   No dependencies. No libraries.

   Usage:
     1. Link css/carousel.css and js/carousel.js on your page.
     2. Build your HTML using this structure:

       <section class="news-carousel">

         <div class="nc-slide">
           <img class="nc-bg" src="..." alt="...">
           <div class="nc-overlay"></div>
           <div class="nc-content">
             <h2 class="nc-headline">Headline text</h2>
             <p class="nc-body">Body text</p>
             <a class="nc-cta" href="..." target="_blank">Button label</a>
           </div>
         </div>

         <!-- repeat .nc-slide for each slide -->

         <div class="nc-thumbs">
           <button class="nc-thumb" aria-label="Slide 1">
             <img src="..." alt="">
           </button>
           <!-- repeat .nc-thumb for each slide -->
         </div>

       </section>

     3. Every .news-carousel on the page is initialized
        automatically — no JS config required.

   Behavior:
     - Auto-advances every 5 seconds.
     - Smooth fade transition between slides.
     - Clicking a thumbnail jumps to that slide and resets the timer.
     - Hovering over the carousel pauses auto-advance.
   ============================================= */

(function () {
  'use strict';

  var INTERVAL = 5000; // milliseconds between auto-advances

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.news-carousel').forEach(initCarousel);
  });

  function initCarousel(carousel) {
    var slides = Array.from(carousel.querySelectorAll('.nc-slide'));
    var thumbs = Array.from(carousel.querySelectorAll('.nc-thumb'));

    if (!slides.length) return;

    var current = 0;
    var timer = null;

    /* Go to a specific slide index, wrapping around */
    function goToSlide(index) {
      slides[current].classList.remove('nc-active');
      if (thumbs[current]) thumbs[current].classList.remove('nc-thumb-active');

      current = ((index % slides.length) + slides.length) % slides.length;

      slides[current].classList.add('nc-active');
      if (thumbs[current]) thumbs[current].classList.add('nc-thumb-active');
    }

    /* Start the auto-advance timer, clearing any existing one first */
    function startTimer() {
      clearInterval(timer);
      timer = setInterval(function () {
        goToSlide(current + 1);
      }, INTERVAL);
    }

    /* Stop the auto-advance timer */
    function stopTimer() {
      clearInterval(timer);
      timer = null;
    }

    /* Thumbnail clicks — jump to slide and restart timer */
    thumbs.forEach(function (thumb, i) {
      thumb.addEventListener('click', function () {
        goToSlide(i);
        startTimer();
      });
    });

    /* Prev / Next arrow clicks */
    var prevBtn = carousel.querySelector('.nc-arrow-prev');
    var nextBtn = carousel.querySelector('.nc-arrow-next');

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        goToSlide(current - 1);
        startTimer();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        goToSlide(current + 1);
        startTimer();
      });
    }

    /* Pause on hover, resume on mouse out */
    carousel.addEventListener('mouseenter', stopTimer);
    carousel.addEventListener('mouseleave', startTimer);

    /* Initialise on the first slide */
    goToSlide(0);
    startTimer();
  }

}());
