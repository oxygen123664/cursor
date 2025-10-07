/* Mobile navigation toggle */
(function setupNavigationToggle() {
  const navToggleButton = document.querySelector('.nav-toggle');
  const navLinks = document.getElementById('primary-navigation');
  if (!navToggleButton || !navLinks) return;

  navToggleButton.addEventListener('click', () => {
    const isExpanded = navToggleButton.getAttribute('aria-expanded') === 'true';
    navToggleButton.setAttribute('aria-expanded', String(!isExpanded));
    navLinks.classList.toggle('open');
  });

  // Close menu after clicking a link on mobile
  navLinks.addEventListener('click', (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.tagName.toLowerCase() === 'a') {
      navLinks.classList.remove('open');
      navToggleButton.setAttribute('aria-expanded', 'false');
    }
  });
})();

/* Smooth scrolling for in-page anchors */
(function setupSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const href = anchor.getAttribute('href');
      if (!href || href.length <= 1) return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', href);
    });
  });
})();

/* Contact form validation (client-side only) */
(function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const statusText = document.getElementById('form-status');

  function setError(element, message) {
    const errorElementId = element.id + '-error';
    const errorElement = document.getElementById(errorElementId);
    if (!errorElement) return;
    errorElement.textContent = message;
    element.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  function validateEmail(value) {
    // Simple, readable email validation
    return /.+@.+\..+/.test(value);
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let isValid = true;

    if (!nameInput.value.trim()) {
      setError(nameInput, 'Please enter your name.');
      isValid = false;
    } else {
      setError(nameInput, '');
    }

    if (!validateEmail(emailInput.value)) {
      setError(emailInput, 'Please enter a valid email.');
      isValid = false;
    } else {
      setError(emailInput, '');
    }

    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      setError(messageInput, 'Please include a brief message (10+ chars).');
      isValid = false;
    } else {
      setError(messageInput, '');
    }

    if (!isValid) {
      statusText.textContent = '';
      return;
    }

    // Simulate successful submit
    statusText.textContent = 'Thanks! Your message has been sent.';
    form.reset();
  });
})();

/* Footer year */
(function setYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
