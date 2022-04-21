// Inline the contents of the css file as plain text.
// See https://parceljs.org/features/bundle-inlining/
const styling = require('bundle-text:./styles.css');

const openModal = () => () => {
  const modal = document.getElementById('bestow-modal');

  modal.style.display = 'block';

  return false;
};

const closeModal = () => () => {
  const modal = document.getElementById('bestow-modal');

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
  modalElem.style.display = 'none';

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

  const navElem = document.createElement('div');
  navElem.id = 'bestow-modal-nav';
  navElem.classList.add('bestow-modal-nav');

  const closeSpan = document.createElement('span');
  closeSpan.textContent = 'X';
  closeSpan.classList.add('bestow-modal-close-span');

  const closeElem = document.createElement('div');
  closeElem.id = 'bestow-modal-close';
  closeElem.classList.add('bestow-modal-close');
  closeElem.appendChild(closeSpan);
  closeElem.onclick = closeModal();
  navElem.appendChild(closeElem);

  const frameElem = document.createElement('iframe');
  frameElem.id = 'bestow-modal-iframe';
  frameElem.setAttribute('allow', 'payment');
  frameElem.setAttribute(
    'sandbox',
    'allow-scripts allow-same-origin allow-forms allow-popups allow-downloads',
  );
  frameElem.src = fullUrl;
  modalElem.appendChild(navElem);
  modalElem.appendChild(frameElem);
  document.body.appendChild(modalElem);

  if (open) {
    openModal()();
  }
}

window.BestowModal = { setup: setupBestow };
