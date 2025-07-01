window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_MEASUREMENT_ID');

document.addEventListener('DOMContentLoaded', function() {
    // ===== SERVICE POPUP WITH EXPLANATIONS =====
    const serviceExplanations = {
        "legal": {
            "basic": "Basic legal assistance includes consultation and document review for standard legal matters.",
            "premium": "Premium legal assistance includes full case representation and comprehensive legal strategy.",
            "corporate": "Corporate legal assistance covers business contracts, compliance, and corporate governance."
        },
        "logistics": {
            "domestic": "Domestic logistics covers all transportation, warehousing, and distribution within your country.",
            "international": "International logistics handles cross-border shipping, customs clearance, and global supply chain management.",
            "warehousing": "Warehousing solutions include storage, inventory management, and distribution center operations."
        },
        "staffing": {
            "temporary": "Temporary staffing provides qualified professionals for short-term projects and seasonal needs.",
            "permanent": "Permanent placement services for finding long-term employees that fit your company culture.",
            "executive": "Executive search services for C-level positions and senior management roles."
        },
        "customer": {
            "support": "Customer support includes help desk services, ticket management, and user assistance.",
            "success": "Customer success focuses on onboarding, retention strategies, and client relationship management.",
            "experience": "Customer experience optimization through journey mapping and satisfaction improvement."
        },
        "devops": {
            "implementation": "DevOps implementation includes CI/CD pipeline setup, automation, and workflow optimization.",
            "security": "Security operations management with monitoring, threat detection, and compliance frameworks.",
            "cloud": "Cloud infrastructure setup, migration services, and scalable architecture design."
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
            
            // CORREGIDO: Mapeo exacto basado en los data-title del HTML
            const serviceMap = {
                'Legal Assistance': 'legal',
                'Logistics': 'logistics',
                'Staffing & Recruiting': 'staffing',  // Exactamente como está en el HTML
                'Customer Service': 'customer',        // Exactamente como está en el HTML
                'Devops & Secops': 'devops'           // Exactamente como está en el HTML
            };
            
            currentService = serviceMap[title];
            
            // Debugging mejorado
            console.log('DEBUG INFO:');
            console.log('Service Title:', title);
            console.log('Mapped to:', currentService);
            console.log('Service explanations available:', currentService ? 'YES' : 'NO');
            
            if (!currentService) {
                console.error('Service not found in mapping. Available titles:', Object.keys(serviceMap));
                return;
            }
            
            // Update main popup
            const popupTitle = document.getElementById('popupTitle');
            const messageLabel = document.getElementById('messageLabel');

            popupTitle.textContent = `Hire ${title}`;
            popupTitle.style.color = 'white'; // Aseguramos color blanco desde JS

            messageLabel.textContent = description;
            messageLabel.style.color = 'white'; // Aseguramos color blanco desde JS
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
                console.log('Adding options for:', currentService);
                for (const [key, text] of Object.entries(serviceExplanations[currentService])) {
                    const option = document.createElement('option');
                    option.value = key;
                    option.textContent = key.charAt(0).toUpperCase() + key.slice(1) + " Service";
                    serviceTypeSelect.appendChild(option);
                    console.log('Added option:', option.textContent);
                }
            } else {
                console.error('No explanations found for service:', currentService);
            }
            
            // Show popup
            contactPopup.classList.add('active');
        });
    });

    // Service type selection handler - MEJORADO
    serviceTypeSelect.addEventListener('change', function() {
        const selectedType = this.value;
        
        console.log('Service Type Selection:');
        console.log('Current Service:', currentService);
        console.log('Selected Type:', selectedType);
        
        // Don't show popup if blank/default option is selected
        if (!selectedType) {
            console.log('No service type selected');
            return;
        }
        
        if (!currentService || !serviceExplanations[currentService]) {
            console.error('Invalid service or no explanations available');
            console.log('Available services:', Object.keys(serviceExplanations));
            return;
        }
        
        if (!serviceExplanations[currentService][selectedType]) {
            console.error('Selected type not found in explanations');
            console.log('Available types for', currentService, ':', Object.keys(serviceExplanations[currentService]));
            return;
        }
        
        // Update explanation popup
        document.getElementById('explanationTitle').textContent = 
            this.options[this.selectedIndex].text + " - Details";
            
        explanationContent.textContent = serviceExplanations[currentService][selectedType];
        
        console.log('Showing explanation popup');
        serviceExplanationPopup.classList.add('active');
        
        // MEJORADO: Auto-close después de 30 segundos con indicador visual
        clearTimeout(explanationTimeout);
        
        // Agregar contador visual (opcional)
        let countdown = 30;
        const originalTitle = document.getElementById('explanationTitle').textContent;
        
        const countdownInterval = setInterval(() => {
            countdown--;
            document.getElementById('explanationTitle').textContent = 
                originalTitle + ` (Auto-close in ${countdown}s)`;
        }, 1000);
        
        explanationTimeout = setTimeout(() => {
            console.log('Auto-closing explanation popup');
            clearInterval(countdownInterval);
            document.getElementById('explanationTitle').textContent = originalTitle;
            serviceExplanationPopup.classList.remove('active');
        }, 30000);
    });

    // Close buttons - MEJORADO
    document.querySelectorAll('.close-popup').forEach(btn => {
        btn.addEventListener('click', (e) => {
            console.log('Closing main popup');
            contactPopup.classList.remove('active');
        });
    });
    
    document.querySelectorAll('.close-explanation-popup').forEach(btn => {
        btn.addEventListener('click', (e) => {
            console.log('Closing explanation popup');
            clearTimeout(explanationTimeout);
            serviceExplanationPopup.classList.remove('active');
            // Restaurar título original
            const originalTitle = document.getElementById('explanationTitle').textContent.split(' (Auto-close')[0];
            document.getElementById('explanationTitle').textContent = originalTitle;
        });
    });

    // Close when clicking outside - MEJORADO
    [contactPopup, serviceExplanationPopup].forEach(popup => {
        popup.addEventListener('click', function(e) {
            if (e.target === this) {
                console.log('Clicked outside popup, closing');
                this.classList.remove('active');
                if (this === serviceExplanationPopup) {
                    clearTimeout(explanationTimeout);
                    // Restaurar título original
                    const originalTitle = document.getElementById('explanationTitle').textContent.split(' (Auto-close')[0];
                    document.getElementById('explanationTitle').textContent = originalTitle;
                }
            }
        });
    });

    // NUEVO: Verificación de elementos DOM al cargar
    console.log('DOM Elements Check:');
    console.log('Gallery items found:', galleryItems.length);
    console.log('Contact popup:', contactPopup ? 'FOUND' : 'NOT FOUND');
    console.log('Service type select:', serviceTypeSelect ? 'FOUND' : 'NOT FOUND');
    console.log('Explanation popup:', serviceExplanationPopup ? 'FOUND' : 'NOT FOUND');
    console.log('Explanation content:', explanationContent ? 'FOUND' : 'NOT FOUND');
});