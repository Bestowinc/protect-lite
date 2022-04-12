// Inline the contents of the css file as plain text.
// See https://parceljs.org/features/bundle-inlining/
const styling = require('bundle-text:./styles.css');

const openGutter = () => () => {
  const gutter = document.getElementById('bestow-slideout-gutter');

  gutter.style.display = 'block';

  return false;
};

const closeGutter = () => () => {
  const gutter = document.getElementById('bestow-slideout-gutter');

  /* Disable slide out visuals */
  gutter.style.display = 'none';
};

function generateParamsUrl(url, params) {
  return `${url}?${Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&')}`;
}

function setupBestow(elementSelector, url, params, open) {
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

  hostElem.onclick = openGutter(url);

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

  const styleSheet = document.createElement('style');
  styleSheet.textContent = styling;
  styleSheet.id = `bestow-slideout-styling`;
  document.body.appendChild(styleSheet);

  const gutterElem = document.createElement('div');
  gutterElem.id = 'bestow-slideout-gutter';
  gutterElem.classList.add('bestow-slideout-gutter');
  gutterElem.style.display = 'none';

  const navElem = document.createElement('div');
  navElem.id = 'bestow-slideout-nav';
  navElem.classList.add('bestow-slideout-nav');

  const closeSpan = document.createElement('span');
  closeSpan.textContent = 'X';
  closeSpan.classList.add('bestow-slideout-close-span');

  const closeElem = document.createElement('div');
  closeElem.id = 'bestow-slideout-close';
  closeElem.classList.add('bestow-slideout-close');
  closeElem.appendChild(closeSpan);
  closeElem.onclick = closeGutter();
  gutterElem.appendChild(closeElem);

  const frameElem = document.createElement('iframe');
  frameElem.id = 'bestow-slideout-iframe';
  frameElem.setAttribute('allow', 'payment');
  frameElem.setAttribute(
    'sandbox',
    'allow-scripts allow-same-origin allow-forms allow-popups allow-downloads',
  );
  frameElem.src = fullUrl;
  gutterElem.appendChild(navElem);
  gutterElem.appendChild(frameElem);
  document.body.appendChild(gutterElem);

  if (open) {
    openGutter()();
  }
}

window.BestowSlideout = { setup: setupBestow };
