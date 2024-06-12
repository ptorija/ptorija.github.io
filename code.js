document.addEventListener('DOMContentLoaded', function () {
  let lastMouseY = 0;
  let sections = document.querySelectorAll('section');
  let navLinks = document.querySelectorAll('header nav a');
  let lastScrollTop = 0;
  let sliderInitialized = false;

  window.onscroll = () => {
    let top = window.scrollY;
    if (top > lastScrollTop) {
      // Scrolling down
      document.querySelector('header').classList.add('hidden');
    } else {
      // Scrolling up
      document.querySelector('header').classList.remove('hidden');
    }
    
    lastScrollTop = top;
    sections.forEach(sec => {
      let top = window.scrollY;
      let offset = sec.offsetTop - 150;
      let height = sec.offsetHeight;
      let id = sec.getAttribute('id');
      if(top >= offset && top < offset + height) {
        // Remove 'active' class from all navigation links
        navLinks.forEach(links => {
          links.classList.remove('active');
        });

        // Add 'active' class to the current navigation link
        document.querySelector('header nav a[href*=' + id + ']').classList.add('active');

        // Check if the current section is "Galeria" and if the slider has not been initialized yet
        if (id === 'galeria' && !sliderInitialized) {
          initializeSlider();
          sliderInitialized = true;
        }
      };
    });
  }; 

  document.addEventListener('mousemove', function(event) {
      lastMouseY = event.clientY;
  });

  // Check the last position of the mouse
  setInterval(function() {
      let screenHeight = window.innerHeight;

      // Check if the last position of the mouse is within the top 10% of the screen height
      if (lastMouseY <= screenHeight * 0.1) {
          document.querySelector('header').classList.remove('hidden');
      }
  }, 100);

  function initializeSlider() {
    var swiper = new Swiper(".mySwiper", {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        speed: 1200,
    });
  }

});

function toggleCurriculum() {
  let $curriculumSection = $('#curriculum');
  let isVisible = $curriculumSection.is(':visible');

  if (!isVisible) {
    // If the curriculum section is not visible, slide it down with animation
    $curriculumSection.slideDown(300, function() {
      let curriculumBottom = $curriculumSection.offset().top - $(window).height() * 0.2;
      $('html, body').animate({
        scrollTop: curriculumBottom
      }, 50); // Start scrolling animation at the same time as slide down
    });
  } else {
    // If the curriculum section is visible, slide it up with animation
    $curriculumSection.slideUp(300);
  }
}

$(document).ready(function() {
  $('#curriculum li').each(function() {
      var dashWidth = $(this).find('::before').width();
      var textWidth = $(this).find('span').width();
      var totalWidth = dashWidth + textWidth;
      $(this).find('::before').css('left', -totalWidth - 20 + 'px');
  });
});

