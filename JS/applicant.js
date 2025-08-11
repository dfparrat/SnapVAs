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
// applicant.js - Complete EmailJS Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    emailjs.init("RW305hYZ62V-A18nB")
        .then(function() {
            console.log('EmailJS initialized successfully');
            
            const form = document.getElementById("applicant-form");
            
            if (!form) {
                console.error('Form not found');
                return;
            }

            form.addEventListener("submit", handleFormSubmit);
        })
        .catch(function(error) {
            console.error("EmailJS init failed:", error);
            showAlert("error", "Service initialization failed. Please refresh the page.");
        });

    function handleFormSubmit(event) {
        event.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        const SERVICE_ID = "service_hbw2k4z";
        const TEMPLATE_ID = "template_n019kcj";

        const formData = {
            from_name: this.elements["from_name"].value,
            from_email: this.elements["from_email"].value,
            from_job: this.elements["from_job"].value,
            from_message: this.elements["from_message"].value,
            attachments: getFileInfo(this)
        };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, formData)
            .then(function(response) {
                console.log("Email sent:", response);
                showAlert("success", "Application submitted successfully!");
                event.target.reset();
            })
            .catch(function(error) {
                console.error("Error:", error);
                showAlert("error", "Submission failed. Please try again.");
            });
    }

    function validateForm() {
        const form = document.getElementById("applicant-form");
        const resume = form.elements["from_resume"];
        
        if (!form.elements["from_name"].value.trim()) {
            showAlert("error", "Please enter your name");
            return false;
        }
        
        if (!form.elements["from_email"].value.trim() || 
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.elements["from_email"].value)) {
            showAlert("error", "Please enter a valid email");
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
        
        if (resume.files[0].size > 5 * 1024 * 1024) {
            showAlert("error", "Resume exceeds 5MB limit");
            return false;
        }
        
        return true;
    }

    function getFileInfo(form) {
        const files = {
            resume: {
                name: form.elements["from_resume"].files[0]?.name || '',
                size: form.elements["from_resume"].files[0]?.size || 0
            },
            cover: {
                name: form.elements["from_cover"].files[0]?.name || '',
                size: form.elements["from_cover"].files[0]?.size || 0
            }
        };
        return `Resume: ${files.resume.name} (${formatFileSize(files.resume.size)}` + 
               (files.cover.name ? ` | Cover: ${files.cover.name} (${formatFileSize(files.cover.size)})` : '');
    }

function formatFileSize(bytes) {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

    function showAlert(type, message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        alertDiv.style.position = 'fixed';
        alertDiv.style.top = '20px';
        alertDiv.style.right = '20px';
        alertDiv.style.padding = '15px';
        alertDiv.style.borderRadius = '5px';
        alertDiv.style.backgroundColor = type === 'success' ? '#d4edda' : '#f8d7da';
        alertDiv.style.color = type === 'success' ? '#155724' : '#721c24';
        alertDiv.style.border = `1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'}`;
        alertDiv.style.zIndex = '1000';
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
});