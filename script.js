const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  siteNav.classList.toggle('is-open', !isOpen);
});

siteNav?.querySelectorAll('a, [data-booking-trigger]').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    siteNav.classList.remove('is-open');
  });
});

const bookingConfig = window.ZEVADA_CONFIG?.bookingWidget;
const bookingWidgetHost = document.querySelector('#booking-widget');
const bookingTriggers = document.querySelectorAll('[data-booking-trigger]');

if (bookingConfig && bookingWidgetHost && bookingTriggers.length) {
  bookingWidgetHost.dataset.slug = bookingConfig.slug;
  bookingWidgetHost.dataset.mode = 'popup';
  bookingWidgetHost.dataset.accent = bookingConfig.accent;
  bookingWidgetHost.dataset.text = bookingConfig.buttonText;
  bookingWidgetHost.dataset.apiUrl = bookingConfig.apiUrl;

  let lastBookingTrigger = null;
  let bookingModalOpen = false;
  let bookingOpenPending = false;

  const enhanceBookingModal = () => {
    const overlay = document.querySelector('#votel-embed-overlay');
    const modal = overlay?.shadowRoot?.querySelector('.vb-modal');
    const closeButton = overlay?.shadowRoot?.querySelector('.vb-close');
    const officialBookingButton = bookingWidgetHost.shadowRoot?.querySelector('.vb-btn');

    officialBookingButton?.setAttribute('tabindex', '-1');
    officialBookingButton?.setAttribute('aria-hidden', 'true');

    if (modal && closeButton) {
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-label', 'Schedule a Consultation');
      closeButton.setAttribute('aria-label', 'Close booking window');

      if (!bookingModalOpen) {
        bookingModalOpen = true;
        closeButton.focus();
      }
    } else if (bookingModalOpen) {
      bookingModalOpen = false;
      lastBookingTrigger?.focus();
    }
  };

  const bookingObserver = new MutationObserver(enhanceBookingModal);
  bookingObserver.observe(document.body, { childList: true, subtree: true });

  bookingTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      lastBookingTrigger = trigger;
      const officialBookingButton = bookingWidgetHost.shadowRoot?.querySelector('.vb-btn');
      if (officialBookingButton) {
        officialBookingButton.click();
      } else {
        bookingOpenPending = true;
      }
    });
  });

  const bookingScript = document.createElement('script');
  bookingScript.type = 'module';
  bookingScript.src = bookingConfig.scriptUrl;
  bookingScript.addEventListener('load', () => {
    const waitForBookingButton = () => {
      const officialBookingButton = bookingWidgetHost.shadowRoot?.querySelector('.vb-btn');
      if (!officialBookingButton) {
        window.setTimeout(waitForBookingButton, 50);
        return;
      }
      if (bookingOpenPending) {
        bookingOpenPending = false;
        officialBookingButton.click();
      }
    };
    waitForBookingButton();
  });
  document.body.appendChild(bookingScript);
}
