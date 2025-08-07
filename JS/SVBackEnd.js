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
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    const navbar = document.querySelector('.navbar-collapse');
    const toggler = document.querySelector('.navbar-toggler');
    
    if (navbar.classList.contains('show') && 
        !e.target.closest('.navbar-collapse') && 
        !e.target.closest('.navbar-toggler')) {
      bootstrap.Collapse.getInstance(navbar).hide();
    }
  });
});
