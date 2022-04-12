/* eslint-disable */
require('./bestow-slideout.js');

const describeIf = condition => (condition ? describe : describe.skip);

const testURL = 'https://somegarbage.bestow.com';
const testParams = {
  gender: 'female',
  height: '69',
  weight: 120,
  tobacco: 'no',
  date_of_birth: '1998-01-01',
  zip: '77386',
};
const fullTestURL = `${testURL}?${Object.keys(testParams)
  .map(key => key + '=' + testParams[key])
  .join('&')}`;
const testElementID = 'some_id';

const iframeElementID = 'bestow-slideout-iframe';
const gutterElementID = 'bestow-slideout-gutter';
const closeElementID = 'bestow-slideout-close';
const styleElementID = 'bestow-slideout-styling';

document.body.innerHTML += `
    <a id="${testElementID}" href="#" rel="noreferrer noopener">
      <span>Get a Quote</span>
    </a>
`;

let setupError;
try {
  window.BestowSlideout.setup(testElementID, testURL, testParams, true, false);
} catch (e) {
  setupError = e;
}

describe('test setup', () => {
  test('error when supplied toggle selector does not exist', () => {
    let err;
    try {
      window.BestowSlideout.setup(`#garbage`, testURL, testParams, true, false);
    } catch (e) {
      err = e;
    }
    expect(err).toBeTruthy();
    expect(err.message).toBe(
      'Supplied bestow-slideout toggle selector could not be found. Please consult integration guide at: https://github.com/Bestowinc/protect-lite/blob/main/documentation/v1/integration-guide.md',
    );
  });
  test('error when supplied params is not an object', () => {
    let err;
    try {
      window.BestowSlideout.setup(testElementID, testURL, `test`);
    } catch (e) {
      err = e;
    }
    expect(err).toBeTruthy();
    expect(err.message).toBe(
      'Params variable passed into the bestow-slideout is not a valid object. Please consult integration guide at: https://github.com/Bestowinc/protect-lite/blob/main/documentation/v1/integration-guide.md',
    );
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
    expect(gutterElement.className).toBe('bestow-slideout-gutter');
  });
  test('gutter element is displayed when open is true on setup', () => {
    expect(gutterElement.style.display).toBe('block');
  });
  test('gutter element is anchored to the right', () => {
    expect(gutterElement.style.left).toBe('');
  });
  test('gutter element is displayed when supplied element is clicked', () => {
    suppliedTestElement.click();
    expect(gutterElement.style.display).toBe('block');
  });
  test('setup is not ran again on subsequent clicks of the supplied element', () => {
    const setupSpy = jest.spyOn(window.BestowSlideout, 'setup');
    suppliedTestElement.click();
    expect(setupSpy).not.toBeCalled();
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
    expect(srcAttribute).toBe(fullTestURL);
  });
  test('iframe element has correct values for allow attribute', () => {
    const allowAttribute = iframeElement.getAttribute('allow');
    expect(allowAttribute).toBe('payment');
  });
  test('iframe element has correct sandbox attribute', () => {
    const srcAttribute = iframeElement.getAttribute('sandbox');
    expect(srcAttribute).toBe(
      'allow-scripts allow-same-origin allow-forms ' +
        'allow-popups allow-downloads',
    );
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
    expect(closeElement.className).toBe('bestow-slideout-close');
  });
  test('close element has close icon', () => {
    const closeIcon = closeElement.querySelector('.bestow-slideout-close-span');
    expect(closeIcon).toBeTruthy();
    expect(closeIcon.textContent).toBe('X');
  });
});

describeIf(styleExists)('style tests', () => {
  test('style element has correct id', () => {
    expect(styleElement.id).toBe(styleElementID);
  });
});
