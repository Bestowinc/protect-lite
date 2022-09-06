// Inline the contents of the css file as plain text.
// See https://parceljs.org/features/bundle-inlining/
const styling = require('bundle-text:./styles.css');

let accordion;

function toggleAccordion() {
  if (accordion.classList.contains('accordionClose')) {
    accordion.classList.remove('accordionClose');
  } else {
    accordion.classList.add('accordionClose');
  }
}

function generateParamsUrl(url, params) {
  return `${url}?${Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&')}`;
}

function setupBestowAccordion(contentDiv, elementSelector, url, params) {
  let contentID = contentDiv;
  let fullUrl;

  if (!contentID.startsWith('#')) {
    contentID = `#${contentID}`;
  }

  const contentElem = document.querySelector(contentID);

  if (!contentElem) {
    throw new Error(
      `Supplied content div for the bestow-accordion could not be found. Please consult integration guide at: https://github.com/Bestowinc/protect-lite/blob/main/documentation/v1/integration-guide.md`,
    );
  }

  accordion = contentElem;

  let elementID = elementSelector;

  if (!elementID.startsWith('#')) {
    elementID = `#${elementID}`;
  }
  const clickElem = document.querySelector(elementID);

  if (!clickElem) {
    throw new Error(
      'Supplied bestow-accordion toggle selector could not be found. Please consult integration guide at: https://github.com/Bestowinc/protect-lite/blob/main/documentation/v1/integration-guide.md',
    );
  }

  clickElem.addEventListener('click', () => toggleAccordion());

  /*  
    Check to see if params passed in is not null and is an object and if so
    map param key/value pairs contained in params object to urlstring.
  */
  if (params != null) {
    if (typeof params === 'object') {
      fullUrl = generateParamsUrl(url, params);
    } else {
      throw new Error(
        'Params variable passed into the bestow-accordion is not a valid object. Please consult integration guide at: https://github.com/Bestowinc/protect-lite/blob/main/documentation/v1/integration-guide.md',
      );
    }
  } else {
    fullUrl = url;
  }

  /* check to see if bestow-accordion-iframe already exists, and if so then update src with fullUrl */
  const existingIframe = document.querySelector('#bestow-accordion-iframe');
  if (existingIframe) {
    existingIframe.src = fullUrl;
    return;
  }

  const styleSheet = document.createElement('style');
  styleSheet.textContent = styling;
  styleSheet.id = 'bestow-accordion-styling';
  document.body.appendChild(styleSheet);

  const frameElem = document.createElement('iframe');
  frameElem.id = 'bestow-accordion-iframe';
  frameElem.setAttribute('allow', 'payment');
  frameElem.setAttribute(
    'sandbox',
    'allow-scripts allow-same-origin allow-forms allow-popups allow-downloads',
  );
  frameElem.src = fullUrl;
  accordion.appendChild(frameElem);

  if (!accordion.classList.contains('accordionClose')) {
    accordion.classList.add('accordionClose');
  }
}

window.BestowAccordion = { setup: setupBestowAccordion };
