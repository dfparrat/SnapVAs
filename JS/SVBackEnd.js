window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_MEASUREMENT_ID');

    document.addEventListener('DOMContentLoaded', function() {
            // Seleccionar todos los elementos de la galería
            const galleryItems = document.querySelectorAll('.gallery-item');
            const popup = document.getElementById('contactPopup');
            const popupTitle = document.getElementById('popupTitle');
            const messageLabel = document.getElementById('messageLabel');
            const closePopup = document.querySelector('.close-popup');
            const contactForm = document.getElementById('contactForm');
            const carousel = document.getElementById('hireGallery');

            // Variables para el carrusel automático
            let currentIndex = 0;
            let autoScrollInterval;
            const itemWidth = window.innerWidth * 0.7 + 15; // Ancho del item + margen
            const isMobile = window.innerWidth <= 768;

            // Función para resaltar el item activo
            function updateActiveItem(index) {
                galleryItems.forEach((item, i) => {
                    if (i === index) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            }
            
            // Función para desplazar el carrusel
            function scrollToIndex(index) {
                if (!isMobile) return;
                
                currentIndex = index;
                if (currentIndex >= galleryItems.length) {
                    currentIndex = 0;
                } else if (currentIndex < 0) {
                    currentIndex = galleryItems.length - 1;
                }
                
                carousel.scrollTo({
                    left: currentIndex * itemWidth,
                    behavior: 'smooth'
                });
                updateActiveItem(currentIndex);
            }
            
             // Detectar cuando el scroll se detiene para actualizar el item activo
            let isScrolling;
            carousel.addEventListener('scroll', () => {
                window.clearTimeout(isScrolling);
                isScrolling = setTimeout(() => {
                    const scrollPosition = carousel.scrollLeft;
                    const newIndex = Math.round(scrollPosition / itemWidth);
                    if (newIndex !== currentIndex) {
                        currentIndex = newIndex;
                        updateActiveItem(currentIndex);
                    }
                }, 100);
            }, false);

            // Iniciar auto-scroll solo en móviles
            function startAutoScroll() {
                if (!isMobile) return;
                
                autoScrollInterval = setInterval(() => {
                    scrollToIndex(currentIndex + 1);
                }, 3000); //3 segundos
            }
            
            // Detener auto-scroll cuando el usuario interactúa
            function pauseAutoScroll() {
                clearInterval(autoScrollInterval);
            }
            
            // Reanudar auto-scroll después de la interacción
            function resumeAutoScroll() {
                startAutoScroll();
            }
            
            // Evento para detectar interacción del usuario
            carousel.addEventListener('touchstart', pauseAutoScroll);
            carousel.addEventListener('touchend', () => {
                setTimeout(resumeAutoScroll, 10000); // Reanudar después de 10 segundos
            });
            
             // Marcar el primer item como activo al inicio
            if (isMobile) {
                updateActiveItem(0);
                startAutoScroll();
            }
            
            // Agregar evento click a cada elemento de la galería
            galleryItems.forEach(item => {
                item.addEventListener('click', function() {
                    const title = this.getAttribute('data-title');
                    const description = this.getAttribute('data-description');
                    
                    // Actualizar el popup con la información del elemento clickeado
                    popupTitle.textContent = `Contacto - ${title}`;
                    messageLabel.textContent = `Mensaje sobre ${title}:`;
                    document.getElementById('message').value = `Hi, We are looking for ${title}.\n${description}\n\nPlease reach out to us at:`;
                    
                    // Mostrar el popup
                    popup.classList.add('active');
                });
            });
            
            // Cerrar popup al hacer clic en la X
            closePopup.addEventListener('click', function() {
                popup.classList.remove('active');
            });
            
            // Cerrar popup al hacer clic fuera del contenido
            popup.addEventListener('click', function(e) {
                if (e.target === popup) {
                    popup.classList.remove('active');
                }
            });
            
            // Manejar el envío del formulario
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Aquí puedes agregar el código para enviar el formulario
                // Por ejemplo, con fetch o XMLHttpRequest
                
                alert('Formulario enviado con éxito. Nos pondremos en contacto pronto.');
                popup.classList.remove('active');
                contactForm.reset();
            });
        });