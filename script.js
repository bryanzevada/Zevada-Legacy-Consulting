const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  siteNav.classList.toggle('is-open', !isOpen);
});

siteNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    siteNav.classList.remove('is-open');
  });
});

document.querySelector('#contact-form')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const status = document.querySelector('.form-status');
  const form = event.currentTarget;
  const endpoint = window.ZEVADA_CONFIG?.contactEndpoint;

  if (!endpoint) {
    status.textContent = 'Thank you. Your consultation request is ready for follow-up. A secure form connection can be added when contact details are confirmed.';
    form.reset();
    return;
  }

  status.textContent = 'Sending your consultation request…';
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    if (!response.ok) throw new Error('Request failed');
    status.textContent = 'Thank you. Your consultation request has been sent.';
    form.reset();
  } catch {
    status.textContent = 'We could not send the request right now. Please try again or contact us directly.';
  }
});
