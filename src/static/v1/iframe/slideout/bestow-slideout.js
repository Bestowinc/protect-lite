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

const openSlideout = () => () => {
  const slideout = document.getElementById('bestow-slideout-screen');

  slideout.style.display = 'block';

  return false;
};

const closeSlideout = () => () => {
  const slideout = document.getElementById('bestow-slideout-screen');

  /* Disable slide out visuals */
  slideout.style.display = 'none';
};

function generateParamsUrl(url, params) {
  return `${url}?${Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&')}`;
}

function setupBestow(elementSelector, url, params, open, _anchorLeft = false) {
  let elementID = elementSelector;
  let fullUrl;

  if (!elementID.startsWith('#')) {
    elementID = `#${elementID}`;
  }
  const hostElem = document.querySelector(elementID);

  if (!hostElem) {
    throw new Error(
      `Supplied bestow-slideout toggle selector could not be found. Please consult integration guide at: https://github.com/Bestowinc/protect-lite/blob/main/documentation/v1/integration-guide.md`,
    );
  }

  hostElem.onclick = openSlideout(url);

  /*  
    Check to see if params passed in is not null and is an object and if so
    map param key/value pairs contained in params object to urlstring.
  */
  if (params != null) {
    if (typeof params === 'object') {
      fullUrl = generateParamsUrl(url, params);
    } else {
      throw new Error(
        `Params variable passed into the bestow-slideout is not a valid object. Please consult integration guide at: https://github.com/Bestowinc/protect-lite/blob/main/documentation/v1/integration-guide.md`,
      );
    }
  } else {
    fullUrl = url;
  }

  /* check to see if bestow-slideout-iframe already exists, and if so then update src with fullUrl */
  const existingIframe = document.querySelector('#bestow-slideout-iframe');
  if (existingIframe) {
    existingIframe.src = fullUrl;
    return;
  }

  const styleSheet = document.createElement('style');
  styleSheet.textContent = styling;
  styleSheet.id = `bestow-slideout-styling`;
  document.body.appendChild(styleSheet);

  const slideoutElem = document.createElement('div');
  slideoutElem.id = 'bestow-slideout';
  slideoutElem.classList.add('bestow-slideout');

  const screenElem = document.createElement('div');
  screenElem.id = 'bestow-slideout-screen';
  screenElem.classList.add('bestow-slideout-screen');
  screenElem.style.display = 'none';

  const backSlashElem = document.createElement('div');
  backSlashElem.id = 'bestow-slideout-close-back-slash';
  backSlashElem.classList.add('bestow-slideout-close-back-slash');

  const forwardSlashElem = document.createElement('div');
  forwardSlashElem.id = 'bestow-slideout-close-forward-slash';
  forwardSlashElem.classList.add('bestow-slideout-close-forward-slash');
  forwardSlashElem.appendChild(backSlashElem);

  const closeElem = document.createElement('div');
  closeElem.id = 'bestow-slideout-close';
  closeElem.classList.add('bestow-slideout-close');
  closeElem.appendChild(forwardSlashElem);
  closeElem.onclick = closeSlideout();

  if (_anchorLeft) {
    slideoutElem.style.left = 0;
    closeElem.style.float = 'right';
    closeElem.style.marginRight = '-50px';
    closeElem.style.marginLeft = '0px';
  }

  const frameElem = document.createElement('iframe');
  frameElem.id = 'bestow-slideout-iframe';
  frameElem.setAttribute('allow', 'payment');
  frameElem.setAttribute(
    'sandbox',
    'allow-scripts allow-same-origin allow-forms allow-popups allow-downloads',
  );
  frameElem.src = fullUrl;

  // Check if screen width is less than 530 and if so add a Nav Bar
  // and include the Close Element within it.
  if (window.screen.width <= 430) {
    // Create nav bar
    const navElem = document.createElement('div');
    navElem.id = 'bestow-slideout-nav';
    navElem.classList.add('bestow-slideout-nav');

    // Remove styling that makes the Close Element float
    closeElem.style.marginRight = '0px';
    closeElem.style.marginLeft = '0px';
    closeElem.style.float = 'right';

    // Attach Close Element to Nav Bar
    navElem.appendChild(closeElem);

    // Attach Nav Bar to Slideout Element
    slideoutElem.appendChild(navElem);
  } else {
    // Just attach the Close Element to Modal
    slideoutElem.appendChild(closeElem);
  }

  slideoutElem.appendChild(frameElem);
  screenElem.appendChild(slideoutElem);
  document.body.appendChild(screenElem);

  if (open) {
    openSlideout()();
  }
}

window.BestowSlideout = { setup: setupBestow };
