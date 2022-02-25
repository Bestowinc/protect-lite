// Inline the contents of the css file as plain text.
// See https://parceljs.org/features/bundle-inlining/
import styling from 'bundle-text:./styles.css';

const openGutter = () => () => {
  const gutter = document.getElementById('bestow-gutter');
  const closeElem = document.getElementById('bestow-close');

  closeElem.style.display = 'block';
  gutter.style.display = 'block';

  return false;
};

const closeGutter = () => () => {
  const gutter = document.getElementById('bestow-gutter');
  const closeElem = document.getElementById('bestow-close');

  /* Disable slide out visuals */
  closeElem.style.display = 'none';
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
  styleSheet.id = `bestow-styling`;
  document.body.appendChild(styleSheet);

  const gutterElem = document.createElement('div');
  gutterElem.id = 'bestow-gutter';
  gutterElem.classList.add('gutter');
  gutterElem.style.display = 'none';

  const closeSpan = document.createElement('span');
  closeSpan.textContent = 'X';
  closeSpan.classList.add('close-span');

  const closeElem = document.createElement('div');
  closeElem.id = 'bestow-close';
  closeElem.classList.add('close');
  closeElem.style.display = 'none';
  closeElem.appendChild(closeSpan);
  closeElem.onclick = closeGutter();
  gutterElem.appendChild(closeElem);

  const frameElem = document.createElement('iframe');
  frameElem.id = 'bestow-frame';
  frameElem.setAttribute('allow', 'payment');
  frameElem.setAttribute(
    'sandbox',
    'allow-scripts allow-same-origin allow-forms allow-popups allow-downloads',
  );
  frameElem.src = url;
  gutterElem.appendChild(frameElem);
  document.body.appendChild(gutterElem);

  if (open) {
    openGutter()();
  }
}

window.BestowSlideout = { setup: setupBestow };
