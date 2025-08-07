window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_MEASUREMENT_ID');

  // Open popup
  document.querySelectorAll('.popup-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const popupId = btn.getAttribute('data-popup');
      document.getElementById(popupId).style.display = 'block';
    });
  });

  // Close popup
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.popup').style.display = 'none';
    });
  });

  // Close popup on outside click
  window.addEventListener('click', e => {
    if (e.target.classList.contains('popup')) {
      e.target.style.display = 'none';
    }
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