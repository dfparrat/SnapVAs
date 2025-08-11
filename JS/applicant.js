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
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with new format
    emailjs.init({
        publicKey: "RW305hYZ62V-A18nB",
        blockHeadless: true
    })
    .then(() => {
        console.log('EmailJS ready');
        setupFormHandlers();
    })
    .catch(handleInitError);

    function handleFormSubmit(event) {
        event.preventDefault();
        
        if (!validateForm()) return;

        emailjs.send("service_hbw2k4z", "template_n019kcj", {
            from_name: this.from_name.value,
            from_email: this.from_email.value,
            from_job: this.from_job.value,
            from_message: this.from_message.value,
            attachments: getFileInfo(this)
        })
        .then(() => {
            showAlert('success', 'Application submitted!');
            this.reset();
        })
        .catch(error => {
            console.error('Send failed:', error);
            showAlert('error', 'Submission failed. Please try again.');
        });
    }

    function validateForm() {
        const form = document.getElementById("applicant-form");
        const validations = [
            { field: 'from_name', message: 'Please enter your name' },
            { field: 'from_email', test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), message: 'Please enter a valid email' },
            { field: 'from_job', message: 'Please select a job title' },
            { field: 'from_resume', test: f => f.files.length, message: 'Please attach your resume' },
            { field: 'from_resume', test: f => f.files[0]?.size <= 5*1024*1024, message: 'Resume exceeds 5MB limit' }
        ];

        for (const {field, test, message} of validations) {
            const element = form.elements[field];
            const value = element.files ? element.files[0] : element.value;
            if (test ? !test(value) : !value) {
                showAlert('error', message);
                element.focus();
                return false;
            }
        }
        return true;
    }

    function getFileInfo(form) {
        const files = ['from_resume', 'from_cover']
            .map(id => form.elements[id].files[0])
            .filter(Boolean)
            .map(file => `${file.name} (${formatFileSize(file.size)})`);
        return files.join(' | ') || 'No files attached';
    }

    function formatFileSize(bytes) {
        if (!+bytes) return '0 Bytes';
        const units = ['Bytes', 'KB', 'MB'];
        const exp = Math.min(Math.floor(Math.log(bytes)/Math.log(1024)), units.length-1);
        return `${(bytes/1024**exp).toFixed(2)} ${units[exp]}`;
    }

    function showAlert(type, message) {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.innerHTML = `
            <div class="alert-content">
                <span class="alert-message">${message}</span>
                <button class="alert-close">&times;</button>
            </div>
        `;
        document.body.appendChild(alert);
        setTimeout(() => alert.remove(), 5000);
        alert.querySelector('.alert-close').addEventListener('click', () => alert.remove());
    }

    function handleInitError(error) {
        console.error('Initialization error:', error);
        showAlert('error', 'Service error. Please contact support.');
    }
});