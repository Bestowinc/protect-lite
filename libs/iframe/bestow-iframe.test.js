require('./bestow-iframe.mjs');

const describeIf = condition => (condition ? describe : describe.skip);

const testURL = 'https://somegarbage.bestow.com';
const testElementID = 'some_id';

const iframeElementID = 'bestow-frame';
const gutterElementID = 'bestow-gutter';
const closeElementID = 'bestow-close';
const styleElementID = 'bestow-styling';

document.body.innerHTML += `
    <a id="${testElementID}" href="#" rel="noreferrer noopener">
      <span>Get a Quote</span>
    </a>
`;

let setupError;
try {
  window.Bestow.setup(`${testElementID}`, testURL);
} catch (e) {
  setupError = e;
}

describe('test setup', () => {
  test('error when supplied element does not exist', () => {
    let err;
    try {
      window.Bestow.setup(`#garbage`, testURL);
    } catch (e) {
      err = e;
    }
    expect(err).toBeTruthy();
    expect(err.message).toBe('Supplied element could not be found');
  });
  test('setup is successful', () => {
    expect(setupError).toBeFalsy();
  });
});

console.log(document.documentElement.innerHTML);

const suppliedTestElement = document.getElementById(testElementID);
const gutterElement = document.getElementById(gutterElementID);
const iframeElement = document.getElementById(iframeElementID);
const closeElement = document.getElementById(closeElementID);
const styleElement = document.getElementById(styleElementID);

const suppliedExists = suppliedTestElement !== null;
const gutterExists = gutterElement !== null;
const iframeExists = iframeElement !== null;
const closeExists = closeElement !== null;
const styleExists = styleElement !== null;

describe('elements exist', () => {
  test('supplied test element exists', () => {
    expect(suppliedExists).toBeTruthy();
  });

  test('gutter element exists', () => {
    expect(gutterExists).toBeTruthy();
  });

  test('iframe element exists', () => {
    expect(iframeExists).toBeTruthy();
  });

  test('close element exists', () => {
    expect(closeExists).toBeTruthy();
  });

  test('style element exists', () => {
    expect(styleExists).toBeTruthy();
  });
});

describeIf(gutterExists)('gutter tests', () => {
  afterAll(() => {
    if (closeExists) {
      closeElement.click();
    }
  });

  test('gutter element has correct id', () => {
    expect(gutterElement.id).toBe(gutterElementID);
  });
  test('gutter element has correct class name', () => {
    expect(gutterElement.className).toBe('gutter');
  });
  test('gutter element is not displayed on load', () => {
    expect(gutterElement.style.display).toBe('none');
  });

  test('gutter element is displayed when supplied element is clicked', () => {
    suppliedTestElement.click();
    expect(gutterElement.style.display).toBe('block');
  });
  test('gutter element is hidden when closed', () => {
    closeElement.click();
    expect(gutterElement.style.display).toBe('none');
  });
});

describeIf(iframeExists)('iframe tests', () => {
  afterAll(() => {
    if (closeExists) {
      closeElement.click();
    }
  });

  test('iframe element has correct id', () => {
    expect(iframeElement.id).toBe(iframeElementID);
  });
  test('iframe element has correct src attribute', () => {
    const srcAttribute = iframeElement.getAttribute('src');
    expect(srcAttribute).toBe(testURL);
  });
  test('iframe element has correct values for allow attribute', () => {
    const allowAttribute = iframeElement.getAttribute('allow');
    expect(allowAttribute).toBe('payment');
  });
});

describeIf(closeExists)('close tests', () => {
  afterAll(() => {
    if (closeExists) {
      closeElement.click();
    }
  });

  test('close element has correct id', () => {
    expect(closeElement.id).toBe(closeElementID);
  });
  test('close element has correct class name', () => {
    expect(closeElement.className).toBe('close');
  });
  test('close element is not displayed on load', () => {
    expect(closeElement.style.display).toBe('none');
  });
  test('close element has close icon', () => {
    const closeIcon = closeElement.querySelector('.close-span');
    expect(closeIcon).toBeTruthy();
    expect(closeIcon.textContent).toBe('X');
  });

  test('close element is displayed when supplied element is clicked', () => {
    suppliedTestElement.click();
    expect(closeElement.style.display).toBe('block');
  });
  test('close element is hidden on click', () => {
    closeElement.click();
    expect(closeElement.style.display).toBe('none');
  });
});

describeIf(styleExists)('style tests', () => {
  test('style element has correct id', () => {
    expect(styleElement.id).toBe(styleElementID);
  });
});
