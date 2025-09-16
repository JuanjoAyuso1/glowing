document.addEventListener('DOMContentLoaded', () => {

    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');

    // 1. Lógica para el botón de hamburguesa
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // 2. Cierra el menú al hacer clic en un enlace de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
        });
    });

    // Código existente para el scroll suave, animaciones, etc.
    const elementsToAnimate = document.querySelectorAll('.service-item, .member');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    const messageModal = document.getElementById('message-modal');
    const messageBodyContent = messageModal.querySelector('.message-body-content');
    const closeMessageBtn = messageModal.querySelector('.close-btn-message');

    const showMessageModal = (isSuccess, title, message) => {
        messageBodyContent.innerHTML = `
            <h3>${title}</h3>
            <p>${message}</p>
        `;
        messageModal.querySelector('.modal-content-message').classList.remove('success', 'error');
        messageModal.querySelector('.modal-content-message').classList.add(isSuccess ? 'success' : 'error');
        messageModal.style.display = 'flex';
    };

    closeMessageBtn.addEventListener('click', () => {
        messageModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === messageModal) {
            messageModal.style.display = 'none';
        }
    });

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const legalDisclaimerHtml = `
            <div class="form-group-legal">
                <input type="checkbox" id="terms-acceptance" name="terms-acceptance" required>
                <label for="terms-acceptance">He leído y acepto la <a href="politica-privacidad.html" target="_blank">política de privacidad</a>.</label>
            </div>
        `;
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.insertAdjacentHTML('beforebegin', legalDisclaimerHtml);

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const termsCheckbox = document.getElementById('terms-acceptance');
            if (!termsCheckbox.checked) {
                return;
            }

            const formspreeUrl = 'https://formspree.io/f/xblapvbd';
            const formData = new FormData(contactForm);

            try {
                const response = await fetch(formspreeUrl, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    showMessageModal(true, "¡Mensaje enviado con éxito!", "Nos pondremos en contacto contigo pronto.");
                    contactForm.reset();
                } else {
                    showMessageModal(false, "Hubo un error", "Por favor, inténtalo de nuevo.");
                }
            } catch (error) {
                console.error("Error de red al enviar el formulario:", error);
                showMessageModal(false, "Error de conexión", "Por favor, verifica tu conexión e inténtalo de nuevo.");
            }
        });
    }

    const loadMoreBtn = document.getElementById('load-more-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const itemsToShow = 3;

    const showProjects = (startIndex, count) => {
        for (let i = startIndex; i < startIndex + count; i++) {
            if (portfolioItems[i]) {
                portfolioItems[i].classList.add('visible');
            }
        }
    };

    const hiddenItems = Array.from(portfolioItems).slice(itemsToShow);
    hiddenItems.forEach(item => {
        item.classList.remove('visible');
    });

    showProjects(0, itemsToShow);

    if (portfolioItems.length <= itemsToShow) {
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }
    }

    if (loadMoreBtn) {
        let currentlyVisibleItems = itemsToShow;

        loadMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();

            showProjects(currentlyVisibleItems, itemsToShow);

            currentlyVisibleItems += itemsToShow;

            if (currentlyVisibleItems >= portfolioItems.length) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }

    const portfolioModal = document.getElementById('portfolio-modal');
    const closeBtn = document.querySelector('.close-btn');
    const modalBody = document.querySelector('.modal-body');

    const projectsData = {
        'project-1': {
            title: 'Campaña de Video para Bruncheo',
            type: 'video',
            media: './imagenes-web/burger-bruncheo.mp4',
            poster: './imagenes-web/logo.jpg',
            description: 'Producción audiovisual y estrategia digital para lanzar una nueva hamburguesa en redes sociales. El objetivo era generar impacto visual y viralidad, capturando la esencia fresca y deliciosa del producto.'
        },
        'project-2': {
            title: 'Producción audiovisual y fotografía gastronómica para restaurante',
            type: 'image',
            media: 'imagenes-web/IMG_0968.jpg',
            description: 'Sesión de fotos y video para un restaurante local, destacando sus platos estrella y el ambiente acogedor. El contenido se utilizó para redes sociales y material promocional, logrando aumentar la afluencia de clientes.'
        },
        'project-3': {
            title: 'Producción en Exterior para Vivero',
            type: 'image',
            media: './imagenes-web/1A4A0334.jpg',
            description: 'Sesión de fotos y video en exteriores para un vivero, capturando la belleza natural de las plantas y flores. El contenido se utilizó para campañas de marketing digital, resaltando la variedad y calidad de los productos ofrecidos.'
        },
        'project-4': {
            title: 'Fotografía de Interiores para Restaurante',
            type: 'image',
            media: './imagenes-web/espaciorest.jpg',
            description: 'Fotografía profesional de interiores para un restaurante, enfocándose en la ambientación y el diseño del espacio. Las imágenes se utilizaron para el sitio web y redes sociales, ayudando a atraer a más clientes al destacar la experiencia gastronómica.'
        },
        'project-5': {
            title: 'Reel creativo para vivero: storytelling visual de naturaleza y diseño',
            type: 'video',
            media: './imagenes-web/reel-vivero.mp4',
            poster: './imagenes-web/logo.jpg',
            description: 'Producción de un reel creativo para un vivero, combinando imágenes de alta calidad de plantas y flores con música envolvente. El video se utilizó en redes sociales y presentaciones, logrando captar la atención del público y aumentar el reconocimiento de la marca.'
        },
        'project-6': {
            title: 'Fotografía corporativa: menú y branding en armonía con la experiencia gastronómica',
            type: 'image',
            media: './imagenes-web/imgcorporativa.jpg',
            description:  'Fotografía corporativa para un restaurante, enfocándose en la presentación del menú y elementos de branding. Las imágenes se utilizaron en materiales impresos y digitales, ayudando a fortalecer la identidad de la marca y atraer a una clientela más amplia.'
        },
        'project-7': {
            title: 'Campaña de Video Casupo Café',
            type: 'video',
            media: './imagenes-web/aperol.mp4',
            poster: './imagenes-web/logo.jpg',
            description: 'Producción audiovisual de una especialidad de cocktail para Casupo Café, destacando los ingredientes frescos y el proceso de preparación. El video se utilizó en redes sociales y promociones, logrando aumentar la visibilidad del producto y atraer a más clientes al establecimiento.'
        },
        'project-8': {
            title: 'Proyecto de Identidad Visual para centro de micropigmentación',
            type: 'video',
            media: './imagenes-web/reelNoemi.mp4',
            poster: './imagenes-web/logo.jpg',
            description: 'Desarrollo de identidad visual y producción audiovisual para un centro de micropigmentación, creando un reel que resalta la precisión y el arte del servicio ofrecido. El contenido se utilizó en campañas de marketing digital, logrando posicionar al centro como líder en su sector.'
        }
    };

    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const projectId = e.currentTarget.dataset.id;
            const project = projectsData[projectId];

            if (project) {
                modalBody.innerHTML = '';

                let mediaHtml = '';
                if (project.type === 'video') {
                    mediaHtml = `
                        <video id="modal-video" controls autoplay loop playsinline poster="${project.poster}">
                            <source src="${project.media}" type="video/mp4">
                            Tu navegador no soporta el video.
                        </video>
                    `;
                } else {
                    mediaHtml = `<img src="${project.media}" alt="${project.title}">`;
                }

                modalBody.innerHTML = `
                    ${mediaHtml}
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                `;

                portfolioModal.style.display = 'block';
                document.body.style.overflow = 'hidden';

                const modalVideo = document.getElementById('modal-video');
                if (modalVideo) {
                    modalVideo.play().catch(error => {
                        console.log('La reproducción automática del video fue bloqueada.');
                        modalVideo.controls = true;
                    });
                }
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        portfolioModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === portfolioModal) {
            portfolioModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    const navLinksScroll = document.querySelectorAll('a[href^="#"]');

    navLinksScroll.forEach(link => {
        // Ignora el botón "Ver más proyectos" para evitar que la página salte al principio
        if (link.id === 'load-more-btn') {
            return;
        }

        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                } else if (href === '#') {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
// JavaScript para el manejo de cookies y el modal
    document.addEventListener('DOMContentLoaded', () => {
        const cookieBanner = document.getElementById('cookie-banner');
        const acceptButton = document.getElementById('accept-cookies');
        const moreInfoButton = document.getElementById('more-info-btn'); // Botón de Más información
        const cookiesModal = document.getElementById('cookies-policy-modal');
        const closeButtons = document.querySelectorAll('.close-btn');

        const hasCookie = (name) => {
            return document.cookie.split(';').some((item) => item.trim().startsWith(name + '='));
        };

        const setCookie = (name, value, days) => {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            const expires = "expires=" + date.toUTCString();
            document.cookie = name + "=" + value + ";" + expires + ";path=/";
        };

        if (!hasCookie('cookiesAccepted')) {
            cookieBanner.classList.remove('hidden');
        } else {
            cookieBanner.classList.add('hidden');
        }

        acceptButton.addEventListener('click', () => {
            setCookie('cookiesAccepted', 'true', 365); // La cookie expira en un año
            cookieBanner.classList.add('hidden');
        });

        // Evento para mostrar el modal de cookies
        moreInfoButton.addEventListener('click', (event) => {
            event.preventDefault();
            cookiesModal.style.display = 'block';
        });

        // Evento para cerrar el modal
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                cookiesModal.style.display = 'none';
            });
        });

        // Cerrar el modal si se hace clic fuera de él
        window.addEventListener('click', (event) => {
            if (event.target === cookiesModal) {
                cookiesModal.style.display = 'none';
            }
        });
    });