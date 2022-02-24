// Inline the contents of the css file as plain text.
// See https://parceljs.org/features/bundle-inlining/
import styling from 'bundle-text:./styles.css';

let accordion;

function toggleAccordion() {
  if (accordion.classList.contains('accordionClose')) {
    accordion.classList.remove('accordionClose');
  } else {
    accordion.classList.add('accordionClose');
  }
}

function setupBestowAccordion(contentDiv, elementSelector, url) {
  let contentID = contentDiv;

  if (!contentID.startsWith('#')) {
    contentID = `#${contentID}`;
  }

  const contentElem = document.querySelector(contentID);

  if (!contentElem) {
    throw new Error(`Supplied content div could not be found`);
  }

  accordion = contentElem;

  let elementID = elementSelector;

  if (!elementID.startsWith('#')) {
    elementID = `#${elementID}`;
  }
  const clickElem = document.querySelector(elementID);

  if (!clickElem) {
    throw new Error(`Supplied element could not be found`);
  }

  clickElem.addEventListener('click', () => toggleAccordion());

  const styleSheet = document.createElement('style');
  styleSheet.textContent = styling;
  styleSheet.id = 'bestow-accordion-styling';
  document.body.appendChild(styleSheet);

  const frameElem = document.createElement('iframe');
  frameElem.id = 'bestow-accordion-iframe';
  frameElem.setAttribute('allow', 'payment');
  frameElem.src = url;
  accordion.appendChild(frameElem);

  if (!accordion.classList.contains('accordionClose')) {
    accordion.classList.add('accordionClose');
  }
}

window.BestowAccordion = { setup: setupBestowAccordion };
