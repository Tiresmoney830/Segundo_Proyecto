// Espera a que todo el contenido del DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {

    //================================================================
    // NAVEGACIÓN CON SCROLL SUAVE
    //================================================================
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    new bootstrap.Collapse(navbarCollapse).hide();
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
        event.preventDefault();
        event.stopPropagation();

        contactForm.classList.remove('was-validated');

        if (!contactForm.checkValidity()) {
            contactForm.classList.add('was-validated');
        } else {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const subject = encodeURIComponent(`Mensaje de ${name} desde la web`);
            const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`);
            const mailtoLink = `mailto:contacto@patitasfelices.com?subject=${subject}&body=${body}`;

            window.location.href = mailtoLink;
            
            setTimeout(() => {
                confirmationModal.show();
            }, 500);

            contactForm.reset();
            contactForm.classList.remove('was-validated');
        }
    });
});