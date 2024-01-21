document.addEventListener('DOMContentLoaded', function () {

  let sections = document.querySelectorAll('section');
  let navLinks = document.querySelectorAll('header nav a');

  window.onscroll = () => {
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
        console.log('Active Section: ', id);
      };
    });
  }; 

});
