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

  // Toggle menu with animation
  toggler.addEventListener('click', function() {
    bsCollapse.toggle();
  });

  // Close when clicking outside (with safety checks)
  document.addEventListener('click', function(e) {
    const clickedInsideNavbar = e.target.closest('.navbar');
    const clickedToggler = e.target.closest('.navbar-toggler');
    
    if (!clickedInsideNavbar && !clickedToggler && navbar.classList.contains('show')) {
      bsCollapse.hide();
    }
  });
});
