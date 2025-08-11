//===NAVBAR TOGGLER FOR MOBILE
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

//===APPLICANT FORM SUBMISSION
// applicant.js - Updated EmailJS Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your User ID
    emailjs.init("RW305hYZ62V-A18nB")
        .then(function() {
            console.log('EmailJS initialized successfully');
            
            const form = document.getElementById("applicant-form");
            
            if (!form) {
                console.error('Form not found');
                return;
            }

            form.addEventListener("submit", function(event) {
                event.preventDefault();
                
                // Validate form before submission
                if (!validateForm()) {
                    return;
                }

                const SERVICE_ID = "service_hbw2k4z";
                const TEMPLATE_ID = "template_n019kcj";

                // Create form data object
                const formData = {
                    from_name: form.elements["from_name"].value,
                    from_email: form.elements["from_email"].value,
                    from_job: form.elements["from_job"].value,
                    from_message: form.elements["from_message"].value,
                    // Note: Files will be handled separately
                };

                console.log("Form data:", formData);

                // First send the email with form data
                emailjs.send(SERVICE_ID, TEMPLATE_ID, formData)
                    .then(function(response) {
                        console.log("Email sent:", response);
                        
                        // Then handle file uploads if they exist
                        return handleFileUploads(form);
                    })
                    .then(function() {
                        // Success message
                        showAlert("success", "Application submitted successfully! We'll contact you soon.");
                        form.reset();
                    })
                    .catch(function(error) {
                        console.error("Error:", error);
                        showAlert("error", "Failed to submit application. Please try again or contact us directly.");
                    });
            });
        })
        .catch(function(error) {
            console.error("EmailJS init failed:", error);
            showAlert("error", "Service initialization failed. Please refresh the page.");
        });

    // Form validation function
    function validateForm() {
        const form = document.getElementById("applicant-form");
        const resume = form.elements["from_resume"];
        
        // Basic validation
        if (!form.elements["from_name"].value.trim()) {
            showAlert("error", "Please enter your name");
            return false;
        }
        
        if (!form.elements["from_email"].value.trim() || 
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.elements["from_email"].value)) {
            showAlert("error", "Please enter a valid email address");
            return false;
        }
        
        if (!form.elements["from_job"].value) {
            showAlert("error", "Please select a job title");
            return false;
        }
        
        if (!resume.files.length) {
            showAlert("error", "Please attach your resume");
            return false;
        }
        
        // Validate file size (5MB max)
        if (resume.files[0].size > 5 * 1024 * 1024) {
            showAlert("error", "Resume file size exceeds 5MB limit");
            return false;
        }
        
        return true;
    }

    // Handle file uploads separately (to your own server)
    function handleFileUploads(form) {
        return new Promise((resolve, reject) => {
            // In a real implementation, you would upload files to your server here
            // This is just a placeholder since EmailJS doesn't handle file attachments directly
            
            // For demo purposes, we'll just resolve immediately
            console.log("Files would be uploaded here in a real implementation");
            resolve();
            
            /* 
            // Example of how you might implement actual file upload:
            const formData = new FormData();
            formData.append('resume', form.elements["from_resume"].files[0]);
            if (form.elements["from_cover"].files.length) {
                formData.append('cover', form.elements["from_cover"].files[0]);
            }
            
            fetch('/upload-endpoint', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => resolve())
            .catch(error => reject(error));
            */
        });
    }

    // Show alert message
    function showAlert(type, message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        alertDiv.style.position = 'fixed';
        alertDiv.style.top = '20px';
        alertDiv.style.right = '20px';
        alertDiv.style.zIndex = '1000';
        alertDiv.style.padding = '15px';
        alertDiv.style.borderRadius = '5px';
        alertDiv.style.backgroundColor = type === 'success' ? '#d4edda' : '#f8d7da';
        alertDiv.style.color = type === 'success' ? '#155724' : '#721c24';
        alertDiv.style.border = `1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'`;
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
});