window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_MEASUREMENT_ID');

// =============================================
// POPUP FIXES (iPhone 15 + Text Overflow)
// =============================================

// 1. iOS Viewport Height Fix (For iPhones)
function handleIOSViewport() {
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
}

// Initialize on load/resize
window.addEventListener('load', handleIOSViewport);
window.addEventListener('resize', handleIOSViewport);

// 2. Popup Logic (All Devices)
document.addEventListener('DOMContentLoaded', function() {
  // ----- Open Popups -----
  document.querySelectorAll('.popup-trigger').forEach(btn => {
    btn.addEventListener('click', function() {
      const popupId = this.getAttribute('data-popup');
      const popup = document.getElementById(popupId);
      popup.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Prevent scrolling

      // iOS Redraw Hack (Forces popup to appear)
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        void popup.offsetHeight; // Trigger reflow
      }
    });
  });

  // ----- Close Popups -----
  // Click [X] or backdrop
  document.querySelectorAll('[data-close], .popup').forEach(el => {
    el.addEventListener('click', function(e) {
      if (e.target === this || e.target.hasAttribute('data-close')) {
        this.closest('.popup').style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
      }
    });
  });

  // Close with ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.popup').forEach(popup => {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto';
      });
    }
  });
});

  //MENU TOGGLER FOR MOBILE DEVICES 
document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.getElementById('navbarNav');
  const toggler = document.querySelector('.navbar-toggler');
  const bsCollapse = new bootstrap.Collapse(navbar, {
    toggle: false
  });

  // Toggle menu when clicking toggler
  toggler.addEventListener('click', function() {
    bsCollapse.toggle();
  });

  // Close when clicking outside
  document.addEventListener('click', function(e) {
    const clickedInsideMenu = e.target.closest('#navbarNav');
    const clickedToggler = e.target.closest('.navbar-toggler');
    
    if (!clickedInsideMenu && !clickedToggler && navbar.classList.contains('show')) {
      bsCollapse.hide();
    }
  });

  // Special handling for backdrop clicks
  navbar.addEventListener('click', function(e) {
    // Check if click is directly on the navbar-collapse element (backdrop area)
    if (e.target === this && !e.target.closest('.navbar-nav')) {
      bsCollapse.hide();
    }
  });
});