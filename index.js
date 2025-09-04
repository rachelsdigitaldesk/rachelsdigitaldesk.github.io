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
  const track = document.getElementById("servicesCarousel");

  // Keep a clean copy of the original cards
  const originalCards = Array.from(track.querySelectorAll(".service-card"));

  let allCards = [];           
  let index = 0;               
  let visible = 1;             
  let step = 0;                
  let resizing = false;

  function getGapPx() {
    const cs = getComputedStyle(track);
    const gap = parseFloat(cs.columnGap || cs.gap || "0");
    return isNaN(gap) ? 0 : gap;
  }

  function computeVisible() {
    const w = window.innerWidth;
    if (w >= 1024) return 3;
    if (w >= 768)  return 2;
    return 1;
  }

  function measureStep() {
    // Use first real card to measure width
    const ref = track.querySelector(".service-card");
    if (!ref) return 0;
    const rect = ref.getBoundingClientRect();
    return rect.width + getGapPx();
  }

  function clearClones() {
    // Remove everything then re-add originals
    track.innerHTML = "";
    originalCards.forEach(card => track.appendChild(card));
  }

  function addClones() {
    // Clone last 'visible' to the start
    const headClones = originalCards.slice(-visible).map(c => {
      const n = c.cloneNode(true);
      n.setAttribute("data-clone", "head");
      return n;
    });
    headClones.forEach(n => track.insertBefore(n, track.firstChild));

    // Clone first 'visible' to the end
    const tailClones = originalCards.slice(0, visible).map(c => {
      const n = c.cloneNode(true);
      n.setAttribute("data-clone", "tail");
      return n;
    });
    tailClones.forEach(n => track.appendChild(n));

    allCards = Array.from(track.querySelectorAll(".service-card"));
  }

  function setIndexWithoutAnim(newIndex) {
    track.style.transition = "none";
    index = newIndex;
    const offset = -(index * step);
    track.style.transform = `translateX(${offset}px)`;
    // Force reflow to apply immediately
    void track.offsetHeight;
  }

  function goToIndex(newIndex, withAnim = true) {
    if (withAnim) {
      track.style.transition = "transform 500ms ease-in-out";
    } else {
      track.style.transition = "none";
    }
    index = newIndex;
    const offset = -(index * step);
    track.style.transform = `translateX(${offset}px)`;
  }

  function setup() {
    // 1) Reset to originals
    clearClones();

    // 2) Compute visible based on breakpoint
    visible = computeVisible();

    // 3) Add clones for seamless loop
    addClones();

    // 4) Measure step (card width + gap) after layout
    step = measureStep();

    // 5) Start at first real card (after head clones)
    setIndexWithoutAnim(visible);
  }

  function moveCarousel(dir) {
    // Move by 1 card step
    goToIndex(index + dir, true);

    // After anim, if we are on a clone, jump back to equivalent real card
    const onTransitionEnd = () => {
      const current = allCards[index];
      if (!current) return;

      if (current.getAttribute("data-clone") === "tail") {
        // We moved past the last real -> jump back by originalCards.length
        setIndexWithoutAnim(index - originalCards.length);
      } else if (current.getAttribute("data-clone") === "head") {
        // We moved before the first real -> jump forward by originalCards.length
        setIndexWithoutAnim(index + originalCards.length);
      }

      track.removeEventListener("transitionend", onTransitionEnd);
    };

    track.addEventListener("transitionend", onTransitionEnd);
  }

  function toggleOverlay(card) {
    document.querySelectorAll(".service-overlay").forEach(ov => ov.classList.add("hidden"));
    const overlay = card.querySelector(".service-overlay");
    if (overlay) overlay.classList.toggle("hidden");
  }

  function closeOverlay(button) {
    const overlay = button.closest(".service-overlay");
    if (overlay) overlay.classList.add("hidden");
  }

  // Expose to buttons
  window.moveCarousel = moveCarousel;
  window.toggleOverlay = toggleOverlay;
  window.closeOverlay = closeOverlay;

  // Debounced resize to keep it smooth & responsive
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Re-setup to adjust visible & step
      setup();
    }, 150);
  });

  // Initial
  setup();
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


