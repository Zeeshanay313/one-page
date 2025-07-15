(function() {
  "use strict";
  document.addEventListener('DOMContentLoaded', function() {
  var dropdowns = document.querySelectorAll('.dropdown-menu .dropdown-toggle');
  dropdowns.forEach(function(ddToggle) {
    ddToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var parent = this.parentElement;
      var submenu = this.nextElementSibling;
      if (submenu && submenu.classList.contains('dropdown-menu')) {
        submenu.classList.toggle('show');
        // Hide other open submenus at this level
        var siblings = parent.parentElement.children;
        for (var i = 0; i < siblings.length; i++) {
          if (siblings[i] !== parent && siblings[i].querySelector('.dropdown-menu.show')) {
            siblings[i].querySelector('.dropdown-menu.show').classList.remove('show');
          }
        }
      }
    });
  });
  // Hide open submenus when clicking outside
  document.addEventListener('click', function(e) {
    document.querySelectorAll('.dropdown-menu .dropdown-menu.show').forEach(function(submenu) {
      submenu.classList.remove('show');
    });
  });
});
  document.querySelectorAll('.scrollto').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const header = document.getElementById('header');
        const offset = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  function animateCount(counter) {
    const target = +counter.getAttribute('data-count');
    let started = false;
    function isInViewport() {
      const rect = counter.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    }
    function startAnimation() {
      if (started) return;
      started = true;
      let current = 0;
      const increment = Math.ceil(target / 100);
      function updateCount() {
        if (current < target) {
          current = Math.min(current + increment, target);
          counter.innerText = current;
          setTimeout(updateCount, 15);
        } else {
          counter.innerText = target;
        }
      }
      updateCount();
    }
    function onScroll() {
      if (isInViewport()) {
        startAnimation();
        window.removeEventListener('scroll', onScroll);
      }
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
  }

  document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.count').forEach(counter => {
      counter.innerText = '0';
      animateCount(counter);
    });
  });

  window.addEventListener('load', () => {
    if (typeof Swiper !== "undefined") {
      new Swiper('.testimonial-slider', {
        loop: true,
        speed: 600,
        autoplay: { delay: 5000 },
        slidesPerView: 1,
        pagination: { el: '.swiper-pagination', clickable: true },
        breakpoints: {
          768: { slidesPerView: 2, spaceBetween: 40 },
          1200: { slidesPerView: 3, spaceBetween: 40 }
        }
      });
    }
  });

  function toggleHeaderScrolled() {
    const header = document.getElementById('header');
    if (header) {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }
  window.addEventListener('load', toggleHeaderScrolled);
  window.addEventListener('scroll', toggleHeaderScrolled);

  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('mobile-nav-active');
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    });
  }
  document.querySelectorAll('#navbar .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (document.body.classList.contains('mobile-nav-active') && mobileNavToggleBtn) {
        document.body.classList.remove('mobile-nav-active');
        mobileNavToggleBtn.classList.add('bi-list');
        mobileNavToggleBtn.classList.remove('bi-x');
      }
    });
  });
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    function toggleBackToTop() {
      if (window.scrollY > 100) backToTop.classList.add('active');
      else backToTop.classList.remove('active');
    }
    window.addEventListener('load', toggleBackToTop);
    window.addEventListener('scroll', toggleBackToTop);
  }
  window.addEventListener('load', () => {
    if (typeof AOS !== "undefined") {
      AOS.init({ duration: 600, easing: 'ease-in-out', once: true });
    }
  });
  window.addEventListener('load', () => {
    if (typeof GLightbox !== "undefined") {
      GLightbox({ selector: '.portfolio-lightbox' });
    }
  });
  window.addEventListener('load', () => {
    const container = document.querySelector('.portfolio-container');
    if (!container) return;
    imagesLoaded(container, () => {
      if (typeof Isotope !== "undefined") {
        const iso = new Isotope(container, {
          itemSelector: '.portfolio-item',
          layoutMode: 'fitRows'
        });
        const filters = document.querySelectorAll('#portfolio-flters li');
        filters.forEach(btn => {
          btn.addEventListener('click', () => {
            filters.forEach(el => el.classList.remove('filter-active'));
            btn.classList.add('filter-active');
            iso.arrange({ filter: btn.getAttribute('data-filter') });
            if (typeof AOS !== "undefined") AOS.refresh();
          });
        });
      }
    });
  });
  const navLinks = document.querySelectorAll('#navbar .nav-link.scrollto');
  function navScrollSpy() {
    let position = window.scrollY + 200;
    navLinks.forEach(link => {
      if (!link.hash) return;
      const section = document.querySelector(link.hash);
      if (!section) return;
      if (position >= section.offsetTop && position < section.offsetTop + section.offsetHeight) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('load', navScrollSpy);
  window.addEventListener('scroll', navScrollSpy);
  window.addEventListener('load', () => {
    if (typeof Swiper !== "undefined") {
      var testimonialSlider = document.querySelector('.testimonial-slider');
      if (testimonialSlider) {
        new Swiper('.testimonial-slider', {
          loop: true,
          speed: 600,
          autoplay: { delay: 5000 },
          pagination: { el: '.swiper-pagination', clickable: true }
        });
      }
    }
  });
})();