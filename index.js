  /*Navbar */
  document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if(target){
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Close mobile menu
          if(!mobileMenu.classList.contains('hidden')){
            mobileMenu.classList.add('hidden');
          }
        }
      });
    });

    // Nav link hover underline animation
    document.querySelectorAll('.nav-link').forEach(link => {
      const underline = link.querySelector('span');
      link.addEventListener('mouseenter', () => underline.style.width = '100%');
      link.addEventListener('mouseleave', () => underline.style.width = '0');
    });
  });
// services
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("servicesCarousel");
  const cards = carousel.querySelectorAll(".service-card");
  let currentIndex = 0;

  function updateCarousel() {
    if (cards.length === 0) return;

    const cardWidth = cards[0].offsetWidth + 20; // include gap
    let visibleCards;

    if (window.innerWidth >= 1024) {
      visibleCards = 3;
    } else if (window.innerWidth >= 768) {
      visibleCards = 2;
    } else {
      visibleCards = 1;
    }

    // Clamp index
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > cards.length - visibleCards) {
      currentIndex = cards.length - visibleCards;
    }

    const offset = -currentIndex * cardWidth;
    carousel.style.transform = `translateX(${offset}px)`;

    // Highlight center card on desktop
    cards.forEach(c => c.classList.remove("active-card"));
    if (window.innerWidth >= 1024) {
      const centerIndex = currentIndex + 1;
      if (cards[centerIndex]) cards[centerIndex].classList.add("active-card");
    }
  }

  function moveCarousel(direction) {
    currentIndex += direction;
    updateCarousel();
  }

  function toggleOverlay(card) {
    document.querySelectorAll(".service-overlay").forEach(ov => ov.classList.add("hidden"));
    const overlay = card.querySelector(".service-overlay");
    overlay.classList.toggle("hidden");
  }

  function closeOverlay(button) {
    const overlay = button.closest(".service-overlay");
    overlay.classList.add("hidden");
  }

  window.moveCarousel = moveCarousel;
  window.toggleOverlay = toggleOverlay;
  window.closeOverlay = closeOverlay;

  window.addEventListener("resize", updateCarousel);
  updateCarousel(); // run on load
});



    // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  navToggle.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

  // Nav hover underline
  document.querySelectorAll('.nav-link').forEach(link => {
    const underline = link.querySelector('span');
    link.addEventListener('mouseenter', () => underline.style.width = '100%');
    link.addEventListener('mouseleave', () => underline.style.width = '0');
  });
