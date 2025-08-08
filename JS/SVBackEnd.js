window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_MEASUREMENT_ID');

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
  // Set iOS viewport height variable
  const setVH = () => {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      document.documentElement.style.setProperty(
        '--window-inner-height', 
        `${window.innerHeight}px`
      );
    }
  };
  setVH();
  window.addEventListener('resize', setVH);

  // Popup handlers
  document.querySelectorAll('.popup-trigger').forEach(trigger => {
    trigger.addEventListener('click', function() {
      const popupId = this.getAttribute('data-popup');
      const popup = document.getElementById(popupId);
      
      // Force reflow for iOS
      void popup.offsetHeight;
      
      // Show popup
      popup.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  });

  // Close handlers
  document.querySelectorAll('.popup, [data-close]').forEach(el => {
    el.addEventListener('click', function(e) {
      if (e.target === this || e.target.hasAttribute('data-close')) {
        this.closest('.popup').style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  });

  // ESC key close
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