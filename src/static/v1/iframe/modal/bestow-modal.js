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

function setupBestow(elementSelector, url, open) {
  let elementID = elementSelector;

  if (!elementID.startsWith('#')) {
    elementID = `#${elementID}`;
  }
  const hostElem = document.querySelector(elementID);

  if (!hostElem) {
    throw new Error(`Supplied element could not be found`);
  }

  hostElem.onclick = openModal(url);

  const styleSheet = document.createElement('style');
  styleSheet.textContent = styling;
  styleSheet.id = `bestow-modal-styling`;
  document.body.appendChild(styleSheet);

  const modalElem = document.createElement('div');
  modalElem.id = 'bestow-modal';
  modalElem.classList.add('bestow-modal');
  modalElem.style.display = 'none';

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
  frameElem.id = 'bestow-modal-frame';
  frameElem.setAttribute('allow', 'payment');
  frameElem.setAttribute(
    'sandbox',
    'allow-scripts allow-same-origin allow-forms allow-popups allow-downloads',
  );
  frameElem.src = url;
  modalElem.appendChild(navElem);
  modalElem.appendChild(frameElem);
  document.body.appendChild(modalElem);

  if (open) {
    openModal()();
  }
}

window.BestowModal = { setup: setupBestow };
