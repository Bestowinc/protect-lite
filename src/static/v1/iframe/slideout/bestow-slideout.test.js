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
const slideoutScreenElementID = 'bestow-slideout-screen';
const slideoutElementID = 'bestow-slideout';
const closeElementID = 'bestow-slideout-close';
const slideoutNavElementID = 'bestow-slideout-nav';
const closeSlashElement1ID = 'bestow-slideout-close-forward-slash';
const closeSlashElement2ID = 'bestow-slideout-close-back-slash';
const styleElementID = 'bestow-slideout-styling';

document.body.innerHTML += `
    <a id="${testElementID}" href="#" rel="noreferrer noopener">
      <span>Get a Quote</span>
    </a>
`;

let setupError;
try {
  window.BestowSlideout.setup(testElementID, testURL, testParams, false, false);
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
      window.BestowSlideout.setup(testElementID, testURL, `test`, false, false);
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
const slideoutElement = document.getElementById(slideoutElementID);
const slideoutScreenElement = document.getElementById(slideoutScreenElementID);
const iframeElement = document.getElementById(iframeElementID);
const closeElement = document.getElementById(closeElementID);
const closeSlashElement1 = document.getElementById(closeSlashElement1ID);
const closeSlashElement2 = document.getElementById(closeSlashElement2ID);
const styleElement = document.getElementById(styleElementID);

const suppliedExists = suppliedTestElement !== null;
const slideoutExists = slideoutElement !== null;
const slideoutScreenExists = slideoutScreenElement !== null;
const iframeExists = iframeElement !== null;
const closeExists = closeElement !== null;
const closeSlash1Exists = closeSlashElement1 !== null;
const closeSlash2Exists = closeSlashElement2 !== null;
const styleExists = styleElement !== null;

describe('elements exist', () => {
  test('supplied test element exists', () => {
    expect(suppliedExists).toBeTruthy();
  });
  test('slideout element exists', () => {
    expect(slideoutExists).toBeTruthy();
  });
  test('iframe element exists', () => {
    expect(iframeExists).toBeTruthy();
  });
  test('close element exists', () => {
    expect(closeExists).toBeTruthy();
  });
  test('closeSlash1 element exists', () => {
    expect(closeSlash1Exists).toBeTruthy();
  });
  test('closeSlash2 element exists', () => {
    expect(closeSlash2Exists).toBeTruthy();
  });
  test('style element exists', () => {
    expect(styleExists).toBeTruthy();
  });
});

describeIf(slideoutScreenExists)('slideout screen tests', () => {
  afterAll(() => {
    if (closeExists) {
      closeElement.click();
    }
  });

  test('slideout screen element has correct id', () => {
    expect(slideoutScreenElement.id).toBe(slideoutScreenElementID);
  });
  test('slideout screen element has correct class name', () => {
    expect(slideoutScreenElement.className).toBe(slideoutScreenElementID);
  });
  test('slideout screen element is not displayed on load', () => {
    expect(slideoutScreenElement.style.display).toBe('none');
  });
  test('slideout screen element is displayed when supplied element is clicked', () => {
    suppliedTestElement.click();
    expect(slideoutScreenElement.style.display).toBe('block');
  });
  test('slideout screen element is hidden when closed', () => {
    closeElement.click();
    expect(slideoutScreenElement.style.display).toBe('none');
  });
});

describeIf(slideoutExists)('slideout tests', () => {
  test('screen element has correct id', () => {
    expect(slideoutElement.id).toBe(slideoutElementID);
  });
  test('slideout element has correct class name', () => {
    expect(slideoutElement.className).toBe(slideoutElementID);
  });
  test('slideout element is anchored to the right', () => {
    expect(slideoutElement.style.left).toBe('');
  });
  test('setup is not ran again on subsequent clicks of the supplied element', () => {
    const setupSpy = jest.spyOn(window.BestowSlideout, 'setup');
    suppliedTestElement.click();
    expect(setupSpy).not.toBeCalled();
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
      'allow-scripts allow-same-origin allow-forms allow-popups allow-downloads',
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
    expect(closeElement.className).toBe(closeElementID);
  });
  test('close forward slash element has correct id', () => {
    expect(closeSlashElement1.id).toBe(closeSlashElement1ID);
  });
  test('close forward slash element has correct class name', () => {
    expect(closeSlashElement1.className).toBe(closeSlashElement1ID);
  });
  test('close back slash element has correct id', () => {
    expect(closeSlashElement2.id).toBe(closeSlashElement2ID);
  });
  test('close back slash element has correct class name', () => {
    expect(closeSlashElement2.className).toBe(closeSlashElement2ID);
  });
});

describe('dom elements reused tests', () => {
  iframeElement.classList.add('reuse-test');
  test('reuse setup is successful', () => {
    let err;
    try {
      window.BestowSlideout.setup(
        testElementID,
        testURL,
        testParams,
        true,
        false,
      );
    } catch (e) {
      err = e;
    }

    expect(err).toBeFalsy();
  });
  test('iframe has been reused', () => {
    expect(iframeElement.classList.contains('reuse-test')).toBeTruthy;
  });
});

describe('navbar is rendered when meets criteria', () => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 430,
  });
  window.dispatchEvent(new Event('resize'));

  test('Resizing window width', () => {
    expect(window.innerWidth).toBe(430);
  });
  test('Reloading modal successful', () => {
    let err;
    try {
      window.BestowSlideout.setup(
        testElementID,
        testURL,
        testParams,
        true,
        false,
      );
    } catch (e) {
      err = e;
    }

    expect(err).toBeFalsy();
  });
  test('navbar exists', () => {
    const slideoutNavExists =
      document.getElementById(slideoutNavElementID) !== null;

    expect(slideoutNavExists).toBeTruthy();
  });
});

describeIf(styleExists)('style tests', () => {
  test('style element has correct id', () => {
    expect(styleElement.id).toBe(styleElementID);
  });
});
