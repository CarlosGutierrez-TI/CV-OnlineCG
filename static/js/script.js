/**
 * DigiNucleo — script.js
 * Carlos Gutierrez Toledo | CV Online
 * v2.0 — Junio 2026
 * ============================================================
 * ÍNDICE
 * 1. Navbar: scroll shrink + active link + mobile close
 * 2. Scroll animations (IntersectionObserver)
 * 3. Typed text effect (hero titles)
 * 4. Particles: generación dinámica y parallax leve
 * 5. Skill pills: hover glow interactivo
 * 6. Timeline: progress bar animada
 * 7. Formulario de contacto: validación + feedback
 * 8. Cursor personalizado (desktop)
 * 9. Sección counter (números animados)
 * 10. Back-to-top button
 * 11. Navbar active link por sección visible
 * 12. Glitch effect en h1 hero al hover
 * 13. Card tilt 3D (perspectiva suave)
 * 14. Init
 * ============================================================
 */

'use strict';

/* ============================================================
   1. NAVBAR — shrink al scroll + cerrar mobile al hacer click
   ============================================================ */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    // Shrink on scroll
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar--scrolled');
        } else {
            navbar.classList.remove('navbar--scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Cerrar menú móvil al clic en link
    const navLinks = navbar.querySelectorAll('.nav-link:not(.dropdown-toggle)');
    const navbarCollapse = document.getElementById('navbarMenu');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = window.bootstrap?.Collapse?.getInstance(navbarCollapse);
                if (bsCollapse) bsCollapse.hide();
            }
        });
    });

    // Cerrar dropdown al clic fuera (mobile)
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navbarCollapse?.classList.contains('show')) {
            const bsCollapse = window.bootstrap?.Collapse?.getInstance(navbarCollapse);
            if (bsCollapse) bsCollapse.hide();
        }
    });
}

/* ============================================================
   2. SCROLL ANIMATIONS — IntersectionObserver con stagger
   ============================================================ */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => {
        el.classList.remove('is-visible'); // reset por si ya estaba aplicado en HTML
        observer.observe(el);
    });
}

/* ============================================================
   3. TYPED TEXT EFFECT — cicla títulos del hero
   ============================================================ */
function initTypedEffect() {
    const target = document.getElementById('typed-role');
    if (!target) return;

    const roles = [
        'Especialista en Soporte TI',
        'Desarrollador Full Stack JS',
        'Estratega Digital',
        'Arquitecto de Soluciones'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 60;
    const deletingSpeed = 35;
    const pauseAfterType = 2200;
    const pauseAfterDelete = 400;

    function type() {
        const current = roles[roleIndex];

        if (!isDeleting) {
            target.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                isDeleting = true;
                setTimeout(type, pauseAfterType);
                return;
            }
        } else {
            target.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(type, pauseAfterDelete);
                return;
            }
        }
        setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
    }

    // Cursor parpadeante
    target.insertAdjacentHTML('afterend', '<span class="typed-cursor" aria-hidden="true">|</span>');
    setTimeout(type, 800);
}

/* ============================================================
   4. PARTICLES — Generación dinámica + parallax suave
   ============================================================ */
function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const PARTICLE_COUNT = 6;
    const configs = [
        { size: 'w-32 h-32', top: '10%', left: '5%',   delay: '0s',   color: 'cyan' },
        { size: 'w-48 h-48', top: '40%', right: '10%', delay: '2s',   color: 'magenta' },
        { size: 'w-24 h-24', top: '70%', left: '20%',  delay: '4s',   color: 'cyan' },
        { size: 'w-20 h-20', top: '15%', right: '30%', delay: '1s',   color: 'primary' },
        { size: 'w-36 h-36', top: '60%', right: '5%',  delay: '3.5s', color: 'magenta' },
        { size: 'w-16 h-16', top: '85%', left: '50%',  delay: '5s',   color: 'cyan' },
    ];

    configs.forEach((cfg, i) => {
        const div = document.createElement('div');
        div.className = `particle animate-float`;
        div.setAttribute('aria-hidden', 'true');
        div.style.cssText = `
      width: ${[128,192,96,80,144,64][i]}px;
      height: ${[128,192,96,80,144,64][i]}px;
      top: ${cfg.top || 'auto'};
      ${cfg.left ? `left: ${cfg.left};` : ''}
      ${cfg.right ? `right: ${cfg.right};` : ''}
      animation-delay: ${cfg.delay};
      ${cfg.color === 'magenta' ? 'background: radial-gradient(circle, rgba(217,70,239,0.5) 0%, rgba(217,70,239,0) 70%);' : ''}
      ${cfg.color === 'primary' ? 'background: radial-gradient(circle, rgba(221,183,255,0.35) 0%, rgba(221,183,255,0) 70%);' : ''}
    `;
        container.appendChild(div);
    });

    // Parallax suave en movimiento del mouse
    let ticking = false;
    document.addEventListener('mousemove', (e) => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const xRatio = (e.clientX / window.innerWidth - 0.5) * 20;
            const yRatio = (e.clientY / window.innerHeight - 0.5) * 20;
            container.querySelectorAll('.particle').forEach((p, i) => {
                const factor = (i % 3 + 1) * 0.4;
                p.style.transform = `translate(${xRatio * factor}px, ${yRatio * factor}px)`;
            });
            ticking = false;
        });
    });
}

/* ============================================================
   5. SKILL PILLS — hover glow interactivo
   ============================================================ */
function initSkillPills() {
    document.querySelectorAll('.skill-pill').forEach(pill => {
        pill.addEventListener('mouseenter', () => {
            pill.style.boxShadow = '0 0 12px rgba(6,182,212,0.4)';
        });
        pill.addEventListener('mouseleave', () => {
            pill.style.boxShadow = '';
        });
    });
}

/* ============================================================
   6. TIMELINE — barra de progreso animada
   ============================================================ */
function initTimeline() {
    const timelineLine = document.querySelector('.timeline-line');
    if (!timelineLine) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                timelineLine.style.transition = 'height 1.5s cubic-bezier(0.4,0,0.2,1)';
                timelineLine.style.height = '100%';
            }
        });
    }, { threshold: 0.1 });

    timelineLine.style.height = '0%';
    observer.observe(timelineLine);
}

/* ============================================================
   7. FORMULARIO DE CONTACTO — validación + feedback visual
   ============================================================ */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const submitBtn = form.querySelector('[type="submit"]');
    const originalBtnText = submitBtn?.querySelector('.btn-text')?.textContent || 'Enviar Mensaje';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const fields = {
            nombre: form.querySelector('#field-nombre'),
            email: form.querySelector('#field-email'),
            mensaje: form.querySelector('#field-mensaje'),
        };

        let valid = true;

        // Limpiar errores previos
        form.querySelectorAll('.field-error').forEach(el => el.remove());
        form.querySelectorAll('.border-red-500').forEach(el => el.classList.remove('border-red-500'));

        // Validar nombre
        if (!fields.nombre?.value.trim()) {
            showFieldError(fields.nombre, 'El nombre es requerido');
            valid = false;
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!fields.email?.value.trim() || !emailRegex.test(fields.email.value)) {
            showFieldError(fields.email, 'Ingresa un email válido');
            valid = false;
        }

        // Validar mensaje
        if (!fields.mensaje?.value.trim() || fields.mensaje.value.trim().length < 10) {
            showFieldError(fields.mensaje, 'El mensaje debe tener al menos 10 caracteres');
            valid = false;
        }

        if (!valid) return;

        // Estado de carga
        if (submitBtn) {
            submitBtn.disabled = true;
            const btnText = submitBtn.querySelector('.btn-text');
            if (btnText) btnText.textContent = 'Enviando...';
            submitBtn.classList.add('btn--loading');
        }

        // Simulación de envío (mailto fallback)
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Abrir cliente de correo
        const nombre = fields.nombre.value;
        const email = fields.email.value;
        const servicio = form.querySelector('#field-servicio')?.value || 'general';
        const mensaje = fields.mensaje.value;
        const mailBody = `Nombre: ${nombre}\nEmail: ${email}\nServicio: ${servicio}\n\n${mensaje}`;
        const mailtoLink = `mailto:carlosgutitoledo@gmail.com?subject=Contacto CV - ${nombre}&body=${encodeURIComponent(mailBody)}`;
        window.location.href = mailtoLink;

        // Feedback de éxito
        showFormSuccess(form);

        // Restore btn
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.classList.remove('btn--loading');
            const btnText = submitBtn.querySelector('.btn-text');
            if (btnText) btnText.textContent = originalBtnText;
        }
    });
}

function showFieldError(field, message) {
    if (!field) return;
    field.classList.add('border-red-500');
    const error = document.createElement('span');
    error.className = 'field-error';
    error.style.cssText = 'display:block;color:#ff6b6b;font-size:11px;font-family:var(--font-mono);margin-top:4px;letter-spacing:0.03em;';
    error.textContent = `⚠ ${message}`;
    field.parentElement.appendChild(error);
}

function showFormSuccess(form) {
    const successEl = document.createElement('div');
    successEl.className = 'form-success-message';
    successEl.style.cssText = `
    position:absolute; inset:0; display:flex; flex-direction:column;
    align-items:center; justify-content:center; gap:12px;
    background:rgba(17,12,21,0.95); backdrop-filter:blur(8px);
    border-radius:inherit; z-index:10; animation:fadeIn 0.4s ease;
  `;
    successEl.innerHTML = `
    <span class="material-symbols-outlined" style="font-size:48px;color:#10B981;text-shadow:0 0 20px rgba(16,185,129,0.5);">check_circle</span>
    <p style="font-family:var(--font-mono);color:#eadfed;font-size:16px;text-align:center;">¡Mensaje enviado!<br><span style="color:#cfc2d6;font-size:13px;">Te responderé en menos de 24h.</span></p>
  `;
    form.style.position = 'relative';
    form.appendChild(successEl);
    setTimeout(() => successEl.remove(), 5000);
}

/* ============================================================
   8. CURSOR PERSONALIZADO (solo desktop)
   ============================================================ */
function initCustomCursor() {
    if (window.matchMedia('(pointer: coarse)').matches) return; // no en móvil/touch

    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    cursor.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 12px; height: 12px; border-radius: 50%;
    background: rgba(0, 243, 255, 0.8);
    box-shadow: 0 0 10px rgba(0,243,255,0.6);
    transform: translate(-50%, -50%);
    transition: transform 0.1s ease, width 0.2s ease, height 0.2s ease, background 0.2s ease;
    will-change: left, top;
  `;

    const cursorRing = document.createElement('div');
    cursorRing.id = 'custom-cursor-ring';
    cursorRing.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9998;
    width: 36px; height: 36px; border-radius: 50%;
    border: 1px solid rgba(0,243,255,0.3);
    transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease, width 0.2s ease, height 0.2s ease, border-color 0.2s ease;
    will-change: left, top;
  `;

    document.body.appendChild(cursor);
    document.body.appendChild(cursorRing);

    let cx = 0, cy = 0;

    document.addEventListener('mousemove', (e) => {
        cx = e.clientX;
        cy = e.clientY;
        cursor.style.left = `${cx}px`;
        cursor.style.top = `${cy}px`;
        cursorRing.style.left = `${cx}px`;
        cursorRing.style.top = `${cy}px`;
    });

    // Efecto en hoverable elements
    const hoverables = 'a, button, .glow-hover, .glass-card, .service-card, .skill-pill, [data-cursor-hover]';
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(hoverables)) {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.background = 'rgba(217,70,239,0.9)';
            cursor.style.boxShadow = '0 0 15px rgba(217,70,239,0.7)';
            cursorRing.style.width = '54px';
            cursorRing.style.height = '54px';
            cursorRing.style.borderColor = 'rgba(217,70,239,0.4)';
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(hoverables)) {
            cursor.style.width = '12px';
            cursor.style.height = '12px';
            cursor.style.background = 'rgba(0,243,255,0.8)';
            cursor.style.boxShadow = '0 0 10px rgba(0,243,255,0.6)';
            cursorRing.style.width = '36px';
            cursorRing.style.height = '36px';
            cursorRing.style.borderColor = 'rgba(0,243,255,0.3)';
        }
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
    });
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

/* ============================================================
   9. COUNTERS ANIMADOS
   ============================================================ */
function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.counter, 10);
            const duration = 1800;
            const start = performance.now();

            const tick = (now) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
                el.textContent = Math.floor(eased * target);
                if (progress < 1) requestAnimationFrame(tick);
                else el.textContent = target;
            };
            requestAnimationFrame(tick);
            observer.unobserve(el);
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

/* ============================================================
   10. BACK-TO-TOP BUTTON
   ============================================================ */
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('btt--visible');
        } else {
            btn.classList.remove('btt--visible');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ============================================================
   11. ACTIVE NAV LINK por sección visible
   ============================================================ */
function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const id = entry.target.id;
            navLinks.forEach(link => {
                const href = link.getAttribute('href') || '';
                const isActive = href.includes(`#${id}`) || (id === 'inicio' && href.endsWith('index.html'));
                link.classList.toggle('nav-link--active', isActive);
            });
        });
    }, { threshold: 0.4, rootMargin: '-80px 0px -40% 0px' });

    sections.forEach(s => observer.observe(s));
}

/* ============================================================
   12. GLITCH EFFECT en H1 hero
   ============================================================ */
function initGlitchHero() {
    const h1 = document.querySelector('#inicio h1');
    if (!h1) return;

    let glitchTimeout;

    h1.addEventListener('mouseenter', () => {
        h1.classList.add('glitch-active');
        clearTimeout(glitchTimeout);
        glitchTimeout = setTimeout(() => h1.classList.remove('glitch-active'), 600);
    });

    // Ocasionalmente, auto-glitch
    setInterval(() => {
        if (Math.random() < 0.15) {
            h1.classList.add('glitch-active');
            setTimeout(() => h1.classList.remove('glitch-active'), 400);
        }
    }, 6000);
}

/* ============================================================
   13. CARD TILT 3D — perspectiva suave en glass-cards
   ============================================================ */
function initCardTilt() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.querySelectorAll('.glass-card, .service-card, [data-tilt]').forEach(card => {
        card.style.transformStyle = 'preserve-3d';
        card.style.transition = 'transform 0.15s ease, box-shadow 0.3s ease, border-color 0.3s ease';

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            const rotX = y * -6;
            const rotY = x * 8;
            card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-3px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

/* ============================================================
   14. SCAN LINE EFFECT en hero image
   ============================================================ */
function initScanLine() {
    const heroImg = document.querySelector('#inicio .hero-image-wrapper');
    if (!heroImg) return;

    const scanLine = document.createElement('div');
    scanLine.className = 'scan-line';
    scanLine.setAttribute('aria-hidden', 'true');
    heroImg.appendChild(scanLine);
}

/* ============================================================
   15. NAV: resaltar página actual en subpáginas
   ============================================================ */
function initCurrentPageHighlight() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
        const href = (link.getAttribute('href') || '').split('#')[0].split('/').pop();
        if (href && href === currentPage) {
            link.classList.add('nav-link--active');
            link.style.color = 'var(--color-neon-cyan)';
        }
    });
}

/* ============================================================
   16. TOAST de bienvenida (solo primera visita)
   ============================================================ */
function initWelcomeToast() {
    if (sessionStorage.getItem('dn-welcomed')) return;
    if (!document.getElementById('inicio')) return; // solo en index

    const toast = document.createElement('div');
    toast.className = 'dn-toast';
    toast.style.cssText = `
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%) translateY(80px);
    background: rgba(35,30,39,0.97); backdrop-filter: blur(16px);
    border: 1px solid rgba(0,243,255,0.3); border-radius: 12px;
    padding: 12px 24px; color: #eadfed;
    font-family: var(--font-mono); font-size: 13px;
    box-shadow: 0 0 20px rgba(0,243,255,0.15);
    z-index: 9000; transition: transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.5s ease;
    opacity: 0; white-space: nowrap; display: flex; align-items: center; gap: 10px;
  `;
    toast.innerHTML = `
    <span style="color:#00f3ff;font-family:'Material Symbols Outlined';font-size:18px;vertical-align:middle;">waving_hand</span>
    Bienvenido a DigiNucleo — <strong style="color:#ddb7ff;">Carlos Gutierrez</strong>
    <button onclick="this.parentElement.remove()" style="background:none;border:none;color:#cfc2d6;cursor:pointer;font-size:16px;padding:0 0 0 8px;">×</button>
  `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        });
    });

    sessionStorage.setItem('dn-welcomed', '1');
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(80px)';
        setTimeout(() => toast.remove(), 600);
    }, 5000);
}

/* ============================================================
   17. INJECT: Back-to-top button markup
   ============================================================ */
function injectBackToTop() {
    if (document.getElementById('back-to-top')) return;
    const btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.setAttribute('aria-label', 'Volver arriba');
    btn.innerHTML = `<span class="material-symbols-outlined">keyboard_arrow_up</span>`;
    btn.style.cssText = `
    position: fixed; bottom: 28px; right: 28px; z-index: 8000;
    width: 44px; height: 44px; border-radius: 50%;
    background: rgba(35,30,39,0.9); backdrop-filter: blur(12px);
    border: 1px solid rgba(0,243,255,0.3); color: #00f3ff;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; box-shadow: 0 0 15px rgba(0,243,255,0.2);
    opacity: 0; transform: translateY(20px);
    transition: opacity 0.3s ease, transform 0.3s ease, box-shadow 0.2s ease;
    pointer-events: none;
  `;
    document.body.appendChild(btn);

    // CSS class toggle via JS style directly
    window.__bttVisible = false;
    const updateBtt = () => {
        const visible = window.scrollY > 500;
        if (visible !== window.__bttVisible) {
            window.__bttVisible = visible;
            btn.style.opacity = visible ? '1' : '0';
            btn.style.transform = visible ? 'translateY(0)' : 'translateY(20px)';
            btn.style.pointerEvents = visible ? 'auto' : 'none';
        }
    };
    window.addEventListener('scroll', updateBtt, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    btn.addEventListener('mouseenter', () => { btn.style.boxShadow = '0 0 25px rgba(0,243,255,0.5)'; btn.style.borderColor = 'rgba(0,243,255,0.7)'; });
    btn.addEventListener('mouseleave', () => { btn.style.boxShadow = '0 0 15px rgba(0,243,255,0.2)'; btn.style.borderColor = 'rgba(0,243,255,0.3)'; });
}

/* ============================================================
   18. SMOOTH SCROLL para anchor links internos
   ============================================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            const hash = href.split('#')[1];
            if (!hash) return;

            // Solo si es la misma página
            const targetPage = href.split('#')[0];
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            if (targetPage && targetPage !== '' && targetPage !== currentPage && targetPage !== 'index.html') return;

            const target = document.getElementById(hash);
            if (!target) return;

            e.preventDefault();
            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 64;
            const targetPos = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 16;
            window.scrollTo({ top: targetPos, behavior: 'smooth' });
        });
    });
}

/* ============================================================
   INIT — Punto de entrada principal
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    // Orden de inicialización importante
    initNavbar();
    initScrollAnimations();
    initTypedEffect();
    injectBackToTop();
    initParticles();
    initSkillPills();
    initTimeline();
    initContactForm();
    initCustomCursor();
    initCounters();
    initActiveNavLinks();
    initGlitchHero();
    initCardTilt();
    initScanLine();
    initCurrentPageHighlight();
    initSmoothScroll();

    // Toast con pequeño delay
    setTimeout(initWelcomeToast, 1500);

    // Log de versión
    console.log('%c⚡ DigiNucleo v2.0 — script.js cargado', 'color:#00f3ff;font-family:monospace;font-size:13px;');
});
