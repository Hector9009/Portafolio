// Efectos interactivos para el portafolio
document.addEventListener('DOMContentLoaded', function() {
    // 1. Scroll suave para navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if(navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    bsCollapse.hide();
                }
            }
        });
    });

    // 2. Navbar sticky y cambio de color
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if(window.scrollY > 100) {
            navbar.classList.add('sticky', 'shadow-sm');
            navbar.style.backgroundColor = 'rgba(65, 103, 136, 0.95)';
        } else {
            navbar.classList.remove('sticky', 'shadow-sm');
            navbar.style.backgroundColor = 'var(--primary-color)';
        }
    });

    // 3. Animación al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.skill-item, .project-card, .about-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if(elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Configurar elementos inicialmente
    document.querySelectorAll('.skill-item, .project-card, .about-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
    });

    // Ejecutar al cargar y al hacer scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // 4. Validación del formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica
            const name = this.querySelector('input[type="text"]');
            const email = this.querySelector('input[type="email"]');
            const message = this.querySelector('textarea');
            
            let isValid = true;
            
            // Resetear estilos de error
            [name, email, message].forEach(field => {
                field.classList.remove('is-invalid');
            });
            
            // Validar nombre
            if(name.value.trim() === '') {
                name.classList.add('is-invalid');
                isValid = false;
            }
            
            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(email.value)) {
                email.classList.add('is-invalid');
                isValid = false;
            }
            
            // Validar mensaje
            if(message.value.trim() === '') {
                message.classList.add('is-invalid');
                isValid = false;
            }
            
            if(isValid) {
                // Simular envío
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    // Mostrar mensaje de éxito
                    const alertDiv = document.createElement('div');
                    alertDiv.className = 'alert alert-success mt-3';
                    alertDiv.textContent = '¡Mensaje enviado con éxito! Pronto me pondré en contacto contigo.';
                    this.appendChild(alertDiv);
                    
                    // Resetear formulario
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Eliminar mensaje después de 5 segundos
                    setTimeout(() => {
                        alertDiv.remove();
                    }, 5000);
                }, 1500);
            }
        });
    }

    // 5. Tooltips para habilidades
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // 6. Efecto hover para proyectos
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            if(img) {
                img.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            if(img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // 7. Cambio de tema claro/oscuro
    const themeToggle = document.getElementById('theme-toggle');
    if(themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
            
            // Cambiar icono
            const icon = this.querySelector('i');
            if(document.body.classList.contains('dark-theme')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
        
        // Cargar tema guardado
        if(localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-theme');
            const icon = themeToggle.querySelector('i');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    // 8. Mostrar año actual en el footer
    const yearSpan = document.getElementById('current-year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});