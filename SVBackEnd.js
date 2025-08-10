document.addEventListener('DOMContentLoaded', function() {
            // Track active popup
            let activePopup = null;
            
            // Show popup function
            function showPopup(popupId, event) {
                event.preventDefault();
                event.stopPropagation();
                
                if (activePopup) return;
                
                const popup = document.getElementById(popupId);
                if (!popup) return;
                
                activePopup = popup;
                popup.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                document.body.style.touchAction = 'none';
            }

            // Close popup function
            function closePopup(event) {
                if (!activePopup) return;
                
                event.preventDefault();
                event.stopPropagation();
                
                activePopup.style.display = 'none';
                document.body.style.overflow = '';
                document.body.style.touchAction = '';
                activePopup = null;
            }

            // Click/touch handler for popup triggers
            function handleTriggerClick(event) {
                const trigger = event.target.closest('.popup-trigger');
                if (trigger) {
                    showPopup(trigger.getAttribute('data-popup'), event);
                }
            }

            // Close when clicking on overlay or close button
            function handlePopupClose(event) {
                if (!activePopup) return;
                
                if (event.target === activePopup || event.target.closest('[data-close]')) {
                    closePopup(event);
                }
            }

            // Event listeners
            document.addEventListener('click', handleTriggerClick);
            document.addEventListener('touchstart', handleTriggerClick, {passive: false});
            document.addEventListener('click', handlePopupClose);
            document.addEventListener('touchend', handlePopupClose, {passive: false});

            // ESC key close
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && activePopup) {
                    activePopup.style.display = 'none';
                    document.body.style.overflow = '';
                    document.body.style.touchAction = '';
                    activePopup = null;
                }
            });
        });


    // Menu toggler for mobile
    const navbar = document.getElementById('navbarNav');
    const toggler = document.querySelector('.navbar-toggler');
    const bsCollapse = new bootstrap.Collapse(navbar, { toggle: false });

    toggler.addEventListener('click', function() {
        bsCollapse.toggle();
    });

    document.addEventListener('click', function(e) {
        const clickedInsideMenu = e.target.closest('#navbarNav');
        const clickedToggler = e.target.closest('.navbar-toggler');
        
        if (!clickedInsideMenu && !clickedToggler && navbar.classList.contains('show')) {
            bsCollapse.hide();
        }
    });

//===CONTACT FORM EMAIL JS
// In your SVBackEnd.js file:
emailjs.init("RW305hYZ62V-A18nB");
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const SERVICE_ID = "service_hbw2k4z";
    const TEMPLATE_ID = "template_cgtcodq";

    // Get form data - fixed to use name attributes instead of IDs
    const formData = {
        name: this.elements["name"].value,
        email: this.elements["email"].value,
        message: this.elements["message"].value
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, formData)
        .then(function(response) {
            alert("Message sent successfully! We'll contact you soon.");
            event.target.reset(); // Fixed to reset the submitted form
        }, function(error) {
            alert("Failed to send message. Please try again later.");
            console.error("EmailJS Error:", error);
        });
});

//===CAREERS FORM EMAIL JS
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with error handling
    emailjs.init("RW305hYZ62V-A18nB")
        .then(function() {
            console.log('EmailJS initialized successfully');
            
            // Get the form element
            const form = document.getElementById("applicant-form");
            
            if (!form) {
                console.error('Form not found - check element ID');
                return;
            }

            form.addEventListener("submit", function(event) {
                event.preventDefault();

                const SERVICE_ID = "service_hbw2k4z";
                const TEMPLATE_ID = "template_n019kcj";

                // Form data collection
                const formData = {
                    from_name: this.elements["from_name"].value,
                    from_email: this.elements["from_email"].value,
                    from_job: this.elements["from_job"].value,
                    from_message: this.elements["from_message"].value
                };

                console.log("Form data being sent:", formData);

                // Email sending with better error handling
                emailjs.send(SERVICE_ID, TEMPLATE_ID, formData)
                    .then(function(response) {
                        console.log("EmailJS success:", response);
                        alert("Message sent successfully! We'll contact you soon.");
                        event.target.reset();
                    })
                    .catch(function(error) {
                        console.error("EmailJS failed:", error);
                        alert("Failed to send message. Error: " + error.text);
                    });
            });
        })
        .catch(function(initError) {
            console.error("EmailJS initialization failed:", initError);
            alert("Failed to initialize email service. Please refresh the page.");
        });
});