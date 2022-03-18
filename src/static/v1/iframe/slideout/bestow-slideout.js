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

function setupBestow(elementSelector, url, open) {
  let elementID = elementSelector;

  if (!elementID.startsWith('#')) {
    elementID = `#${elementID}`;
  }
  const hostElem = document.querySelector(elementID);

  if (!hostElem) {
    throw new Error(`Supplied element could not be found`);
  }

  hostElem.onclick = openGutter(url);

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
  frameElem.src = url;
  gutterElem.appendChild(navElem);
  gutterElem.appendChild(frameElem);
  document.body.appendChild(gutterElem);

  if (open) {
    openGutter()();
  }
}

window.BestowSlideout = { setup: setupBestow };
