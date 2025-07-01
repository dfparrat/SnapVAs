window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_MEASUREMENT_ID');

document.addEventListener('DOMContentLoaded', function() {
    // ===== SERVICE POPUP WITH EXPLANATIONS =====
    const serviceExplanations = {
        "legal": {
            "basic": "Basic legal assistance includes consultation and document review.",
            "premium": "Premium legal assistance includes full case representation.",
            "corporate": "Corporate legal assistance covers business contracts."
        },
        "logistics": {
            "domestic": "Domestic logistics covers all transportation within your country.",
            "international": "Handles cross-border shipping and customs.",
            "warehousing": "Storage and inventory management solutions."
        },
        "staffing": {  // Changed from "staffingrecruiting" to match your data-title
            "temporary": "Temporary staffing for short-term project needs.",
            "permanent": "Permanent placement for long-term positions.",
            "executive": "Executive search for C-level roles."
        },
        "customer": {  // Changed from "customerservice" to match your data-title
            "support": "Basic customer support for inquiries.",
            "success": "Customer onboarding and retention.",
            "experience": "Customer experience strategy."
        },
        "devops": {  // Changed from "devopssecops" to match your data-title
            "implementation": "CI/CD pipeline implementation.",
            "security": "Security operations management.",
            "cloud": "Cloud infrastructure setup."
        }
    };

    // Get DOM elements
    const galleryItems = document.querySelectorAll('.gallery-item');
    const contactPopup = document.getElementById('contactPopup');
    const serviceTypeSelect = document.getElementById('serviceType');
    const serviceExplanationPopup = document.getElementById('serviceExplanationPopup');
    const explanationContent = document.getElementById('explanationContent');
    
    let currentService = '';
    let explanationTimeout;

    // Unified gallery item click handler
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.getAttribute('data-title');
            const description = this.getAttribute('data-description');
            
            // Map service names consistently with your HTML data-titles
            const serviceMap = {
                'Legal Assistance': 'legal',
                'Logistics': 'logistics',
                'Staffing & Recruiting': 'staffing',
                'Customer Service': 'customer',
                'Devops & Secops': 'devops',
                'Cx Service': 'customer'
            };
            
            currentService = serviceMap[title];
            
            // Debugging - check if service is mapped correctly
            console.log('Service:', title, 'Mapped to:', currentService);
            
            // Update main popup
            document.getElementById('popupTitle').textContent = `Hire ${title}`;
            document.getElementById('messageLabel').textContent = description;
            
            // Populate service types
            serviceTypeSelect.innerHTML = '';
            
            // Add blank/default option first
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = '-- Select service type --';
            defaultOption.selected = true;
            defaultOption.disabled = true;
            serviceTypeSelect.appendChild(defaultOption);
            
            // Add service-specific options
            if (serviceExplanations[currentService]) {
                for (const [key, text] of Object.entries(serviceExplanations[currentService])) {
                    const option = document.createElement('option');
                    option.value = key;
                    option.textContent = key.charAt(0).toUpperCase() + key.slice(1) + " Service";
                    serviceTypeSelect.appendChild(option);
                }
            } else {
                console.warn('No explanations found for service:', currentService);
            }
            
            // Show popup
            contactPopup.classList.add('active');
        });
    });

    // Service type selection handler
    serviceTypeSelect.addEventListener('change', function() {
        const selectedType = this.value;
        
        // Don't show popup if blank/default option is selected
        if (!selectedType) return;
        
        // Debugging - check current service and selected type
        console.log('Selected service type:', currentService, selectedType);
        
        if (!currentService || !serviceExplanations[currentService]) {
            console.warn('Invalid service or no explanations available');
            return;
        }
        
        // Update explanation popup
        document.getElementById('explanationTitle').textContent = 
            this.options[this.selectedIndex].text + " Details";
            
        explanationContent.textContent = serviceExplanations[currentService][selectedType];
        serviceExplanationPopup.classList.add('active');
        
        // Auto-close after 30 seconds
        clearTimeout(explanationTimeout);
        explanationTimeout = setTimeout(() => {
            serviceExplanationPopup.classList.remove('active');
        }, 30000);
    });
    // Close buttons
    document.querySelectorAll('.close-popup').forEach(btn => {
        btn.addEventListener('click', () => contactPopup.classList.remove('active'));
    });
    
    document.querySelectorAll('.close-explanation-popup').forEach(btn => {
        btn.addEventListener('click', () => {
            clearTimeout(explanationTimeout);
            serviceExplanationPopup.classList.remove('active');
        });
    });

    // Close when clicking outside
    [contactPopup, serviceExplanationPopup].forEach(popup => {
        popup.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                if (this === serviceExplanationPopup) {
                    clearTimeout(explanationTimeout);
                }
            }
        });
    });
});