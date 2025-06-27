// Espera a que todo el contenido del DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {

    //================================================================
    // NAVEGACIÓN CON SCROLL SUAVE
    //================================================================
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Previene el comportamiento por defecto del ancla
            e.preventDefault();
            
            // Obtiene el ID del objetivo desde el href del enlace
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Realiza el scroll suave hacia la sección
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Cierra el menú hamburguesa en móviles después de hacer clic
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });

    //================================================================
    // VALIDACIÓN DEL FORMULARIO DE CONTACTO
    //================================================================
    const contactForm = document.getElementById('contactForm');
    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));

    contactForm.addEventListener('submit', function(event) {
        // Previene el envío real del formulario
        event.preventDefault();
        event.stopPropagation();

        // Elimina las clases de validación anteriores para una nueva validación
        contactForm.classList.remove('was-validated');

        // Valida el formulario usando las reglas de Bootstrap
        if (!contactForm.checkValidity()) {
            contactForm.classList.add('was-validated');
        } else {
            // Si el formulario es válido, procedemos
            
            // 1. Recolectar los datos del formulario
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // 2. Crear el enlace mailto:
            // Se codifican los componentes para que los espacios y caracteres especiales funcionen
            const subject = encodeURIComponent(`Mensaje de ${name} desde la web`);
            const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`);
            const mailtoLink = `mailto:contacto@patitasfelices.com?subject=${subject}&body=${body}`;

            // 3. Simular el envío abriendo el cliente de correo del usuario
            window.location.href = mailtoLink;
            
            // 4. Mostrar el modal de confirmación como simulación de éxito
            // Se usa un pequeño retraso para dar tiempo a que se inicie el cliente de correo
            setTimeout(() => {
                confirmationModal.show();
            }, 500);

            // 5. Limpiar el formulario y quitar las clases de validación
            contactForm.reset();
            contactForm.classList.remove('was-validated');
        }
    });
    
    // Función de validación de email simple (Bootstrap ya lo hace, pero es un buen ejemplo)
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});