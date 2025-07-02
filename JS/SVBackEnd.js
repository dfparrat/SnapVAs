window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_MEASUREMENT_ID');

document.addEventListener('DOMContentLoaded', function() {
    // ===== SERVICE POPUP WITH EXPLANATIONS =====
    const serviceExplanations = {
        "legal": {
            "basic": {
                "description": "Basic legal assistance includes consultation and document review for standard legal matters.",
                "image": "IMG/legal_1.jpg"
            },
            "premium": {
                "description": "Premium legal assistance includes full case representation and comprehensive legal strategy.",
                "image": "IMG/legal_1.jpg"
            },
            "corporate": {
                "description": "Corporate legal assistance covers business contracts, compliance, and corporate governance.",
                "image": "IMG/legal_1.jpg"
            }
        },
        "logistics": {
            "domestic": {
                "description": "Domestic logistics covers all transportation, warehousing, and distribution within your country.",
                "image": "IMG/logistics_1.jpg"
            },
            "international": {
                "description": "International logistics handles cross-border shipping, customs clearance, and global supply chain management.",
                "image": "IMG/logistics_1.jpg"
            },
            "warehousing": {
                "description": "Warehousing solutions include storage, inventory management, and distribution center operations.",
                "image": "IMG/logistics_1.jpg"
            }
        },
        "staffing": {
            "temporary": {
                "description": "Temporary staffing provides qualified professionals for short-term projects and seasonal needs.",
                "image": "IMG/staffing_1.jpg"
            },
            "permanent": {
                "description": "Permanent placement services for finding long-term employees that fit your company culture.",
                "image": "IMG/staffing_1.jpg"
            },
            "executive": {
                "description": "Executive search services for C-level positions and senior management roles.",
                "image": "IMG/staffing_1.jpg"
            }
        },
        "customer": {
            "support": {
                "description": "Customer support includes help desk services, ticket management, and user assistance.",
                "image": "IMG/CX_1.jpg"
            },
            "success": {
                "description": "Customer success focuses on onboarding, retention strategies, and client relationship management.",
                "image": "IMG/CX_.jpg"
            },
            "experience": {
                "description": "Customer experience optimization through journey mapping and satisfaction improvement.",
                "image": "IMG/CX_1.jpg"
            }
        },
        "devops": {
            "implementation": {
                "description": "DevOps implementation includes CI/CD pipeline setup, automation, and workflow optimization.",
                "image": "IMG/devsecops_2.jpg"
            },
            "security": {
                "description": "Security operations management with monitoring, threat detection, and compliance frameworks.",
                "image": "IMG/devsecops_2.jpg"
            },
            "cloud": {
                "description": "Cloud infrastructure setup, migration services, and scalable architecture design.",
                "image": "IMG/devsecops_2.jpg"
            }
        }
    };

    // Get DOM elements
    const galleryItems = document.querySelectorAll('.gallery-item');
    const contactPopup = document.getElementById('contactPopup');
    const serviceTypeSelect = document.getElementById('serviceType');
    const serviceExplanationPopup = document.getElementById('serviceExplanationPopup');
    const explanationContent = document.getElementById('explanationContent');
    const serviceImage = document.getElementById('serviceImage'); // Nuevo: elemento de imagen
    
    let currentService = '';
    let explanationTimeout;

    // Unified gallery item click handler
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.getAttribute('data-title');
            const description = this.getAttribute('data-description');
            
            const serviceMap = {
                'Legal Assistance': 'legal',
                'Logistics': 'logistics',
                'Staffing & Recruiting': 'staffing',
                'Customer Service': 'customer',
                'Devops & Secops': 'devops'
            };
            
            currentService = serviceMap[title];
            
            if (!currentService) {
                console.error('Service not found in mapping');
                return;
            }
            
            // Update main popup
            const popupTitle = document.getElementById('popupTitle');
            const messageLabel = document.getElementById('messageLabel');

            popupTitle.textContent = `Hire ${title}`;
            popupTitle.style.color = 'white';

            messageLabel.textContent = description;
            messageLabel.style.color = 'white';
            
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
                for (const [key, data] of Object.entries(serviceExplanations[currentService])) {
                    const option = document.createElement('option');
                    option.value = key;
                    option.textContent = key.charAt(0).toUpperCase() + key.slice(1) + " Service";
                    serviceTypeSelect.appendChild(option);
                }
            }
            
            // Show popup
            contactPopup.classList.add('active');
        });
    });

    // Service type selection handler
    serviceTypeSelect.addEventListener('change', function() {
        const selectedType = this.value;
        
        if (!selectedType) return;
        
        if (!currentService || !serviceExplanations[currentService] || !serviceExplanations[currentService][selectedType]) return;
        
        const serviceData = serviceExplanations[currentService][selectedType];
        
        // Update explanation popup
        document.getElementById('explanationTitle').textContent = 
            this.options[this.selectedIndex].text + " Details";
            
        // Set image and description
        serviceImage.src = serviceData.image;
        serviceImage.alt = `${currentService} ${selectedType} service`;
        explanationContent.textContent = serviceData.description;
        
        // Show popup
        serviceExplanationPopup.classList.add('active');
        
        // Auto-close after 30 seconds
        clearTimeout(explanationTimeout);
        
        let countdown = 30;
        const originalTitle = document.getElementById('explanationTitle').textContent;
        
        const countdownInterval = setInterval(() => {
            countdown--;
            document.getElementById('explanationTitle').textContent = 
                originalTitle + ` (Auto-close in ${countdown}s)`;
        }, 1000);
        
        explanationTimeout = setTimeout(() => {
            clearInterval(countdownInterval);
            document.getElementById('explanationTitle').textContent = originalTitle;
            serviceExplanationPopup.classList.remove('active');
        }, 30000);
    });

    // Close buttons
    document.querySelectorAll('.close-popup').forEach(btn => {
        btn.addEventListener('click', (e) => {
            contactPopup.classList.remove('active');
        });
    });
    
    document.querySelectorAll('.close-explanation-popup').forEach(btn => {
        btn.addEventListener('click', (e) => {
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