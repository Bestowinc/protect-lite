// Inline the contents of the css file as plain text.
// See https://parceljs.org/features/bundle-inlining/
const styling = require('bundle-text:./styles.css');

const Sentry = require('@sentry/browser');

// Importing @sentry/tracing patches the global hub for tracing to work.
const SentryTracing = require('@sentry/tracing');

Sentry.init({
  dsn: 'https://c8ba5f624f73456db0ed40b7373df213@o114118.ingest.sentry.io/6400059',
  release: 'protect-lite@1.1.5',
  integrations: [new SentryTracing.BrowserTracing()],
  tracesSampleRate: 1.0,
});

const openModal = () => () => {
  const modal = document.getElementById('bestow-modal-screen');

  modal.style.display = 'block';

  return false;
};

const closeModal = () => () => {
  const modal = document.getElementById('bestow-modal-screen');

  /* Disable visuals (ie: close) */
  modal.style.display = 'none';
};

function generateParamsUrl(url, params) {
  return `${url}?${Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&')}`;
}

function setupBestow(elementSelector, url, params, open, size) {
  let elementID = elementSelector;
  let fullUrl;

  if (!elementID.startsWith('#')) {
    elementID = `#${elementID}`;
  }
  const hostElem = document.querySelector(elementID);

  if (!hostElem) {
    throw new Error(
      'Supplied bestow-modal toggle selector could not be found. Please consult integration guide at: https://github.com/Bestowinc/protect-lite/blob/main/documentation/v1/integration-guide.md',
    );
  }

  hostElem.onclick = openModal(url);

  /*  
    Check to see if params passed in is not null and is an object and if so
    map param key/value pairs contained in params object to urlstring.
  */
  if (params != null) {
    if (typeof params === 'object') {
      fullUrl = generateParamsUrl(url, params);
    } else {
      throw new Error(
        `Params variable passed into the bestow-modal is not a valid object. Please consult integration guide at: https://github.com/Bestowinc/protect-lite/blob/main/documentation/v1/integration-guide.md`,
      );
    }
  } else {
    fullUrl = url;
  }

  /* check to see if bestow-modal-iframe already exists, and if so then update src with fullUrl */
  const existingIframe = document.querySelector('#bestow-modal-iframe');
  if (existingIframe) {
    existingIframe.src = fullUrl;
    return;
  }

  const styleSheet = document.createElement('style');
  styleSheet.textContent = styling;
  styleSheet.id = `bestow-modal-styling`;
  document.body.appendChild(styleSheet);

  const modalElem = document.createElement('div');
  modalElem.id = 'bestow-modal';
  modalElem.classList.add('bestow-modal');

  if (size) {
    if (!Number.isFinite(size) || size < 10 || size > 100) {
      throw new Error(
        `Size variable passed into the bestow-modal needs to be a number between 10-100. Please consult integration guide at: https://github.com/Bestowinc/protect-lite/blob/main/documentation/v1/integration-guide.md`,
      );
    }
    modalElem.style.height = `${size}%`;
    modalElem.style.left = `${(100 - size) / 2}%`;
    modalElem.style.right = `${(100 - size) / 2}%`;
  }

  const screenElem = document.createElement('div');
  screenElem.id = 'bestow-modal-screen';
  screenElem.classList.add('bestow-modal-screen');
  screenElem.style.display = 'none';

  const backSlashElem = document.createElement('div');
  backSlashElem.id = 'bestow-modal-close-back-slash';
  backSlashElem.classList.add('bestow-modal-close-back-slash');

  const forwardSlashElem = document.createElement('div');
  forwardSlashElem.id = 'bestow-modal-close-forward-slash';
  forwardSlashElem.classList.add('bestow-modal-close-forward-slash');
  forwardSlashElem.appendChild(backSlashElem);

  const closeElem = document.createElement('div');
  closeElem.id = 'bestow-modal-close';
  closeElem.classList.add('bestow-modal-close');
  closeElem.appendChild(forwardSlashElem);
  closeElem.onclick = closeModal();

  const frameElem = document.createElement('iframe');
  frameElem.id = 'bestow-modal-iframe';
  frameElem.setAttribute('allow', 'payment');
  frameElem.setAttribute(
    'sandbox',
    'allow-scripts allow-same-origin allow-forms allow-popups allow-downloads',
  );
  frameElem.src = fullUrl;

  // Check if screen width is less than 530 and if so add a Nav Bar
  // and include the Close Element within it.
  if (window.screen.width <= 530) {
    // Create nav bar
    const navElem = document.createElement('div');
    navElem.id = 'bestow-modal-nav';
    navElem.classList.add('bestow-modal-nav');

    // Remove styling that makes the Close Element float to the right side
    closeElem.style.marginRight = '0px';

    // Attach Close Element to Nav Bar
    navElem.appendChild(closeElem);

    // Attach Nav Bar to Modal Element
    modalElem.appendChild(navElem);
  } else {
    // Just attach the Close Element to Modal
    modalElem.appendChild(closeElem);
  }

  modalElem.appendChild(frameElem);
  screenElem.appendChild(modalElem);
  document.body.appendChild(screenElem);

  if (open) {
    openModal()();
  }
}

window.BestowModal = { setup: setupBestow };
