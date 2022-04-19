/* eslint-disable */
require('./bestow-modal.js');

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

const iframeElementID = 'bestow-modal-frame';
const modalElementID = 'bestow-modal';
const modalNavElementID = 'bestow-modal-nav';
const closeElementID = 'bestow-modal-close';
const styleElementID = 'bestow-modal-styling';

document.body.innerHTML += `
    <a id="${testElementID}" href="#" rel="noreferrer noopener">
      <span>Get a Quote</span>
    </a>
`;

let setupError;
try {
  window.BestowModal.setup(testElementID, testURL, testParams, false, 90);
} catch (e) {
  setupError = e;
}

describe('test setup', () => {
  test('error when supplied toggle selector does not exist', () => {
    let err;
    try {
      window.BestowModal.setup(`#garbage`, testURL, testParams, false, 90);
    } catch (e) {
      err = e;
    }
    expect(err).toBeTruthy();
    expect(err.message).toBe(
      'Supplied bestow-modal toggle selector could not be found. Please consult integration guide at: https://github.com/Bestowinc/protect-lite/blob/main/documentation/v1/integration-guide.md',
    );
  });
  test('error when supplied params is not an object', () => {
    let err;
    try {
      window.BestowModal.setup(testElementID, testURL, `test`, false, 90);
    } catch (e) {
      err = e;
    }
    expect(err).toBeTruthy();
    expect(err.message).toBe(
      'Params variable passed into the bestow-modal is not a valid object. Please consult integration guide at: https://github.com/Bestowinc/protect-lite/blob/main/documentation/v1/integration-guide.md',
    );
  });
  test('setup is successful', () => {
    expect(setupError).toBeFalsy();
  });
});

console.log(document.documentElement.innerHTML);

const suppliedTestElement = document.getElementById(testElementID);
const modalElement = document.getElementById(modalElementID);
const modalNavElement = document.getElementById(modalNavElementID);
const iframeElement = document.getElementById(iframeElementID);
const closeElement = document.getElementById(closeElementID);
const styleElement = document.getElementById(styleElementID);

const suppliedExists = suppliedTestElement !== null;
const modalExists = modalElement !== null;
const modalNavExists = modalNavElement !== null;
const iframeExists = iframeElement !== null;
const closeExists = closeElement !== null;
const styleExists = styleElement !== null;

describe('elements exist', () => {
  test('supplied test element exists', () => {
    expect(suppliedExists).toBeTruthy();
  });
  test('modal element exists', () => {
    expect(modalExists).toBeTruthy();
  });
  test('modal nav element exists', () => {
    expect(modalNavExists).toBeTruthy();
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

describeIf(modalExists)('modal tests', () => {
  afterAll(() => {
    if (closeExists) {
      closeElement.click();
    }
  });

  test('modal element has correct id', () => {
    expect(modalElement.id).toBe(modalElementID);
  });
  test('modal element has correct class name', () => {
    expect(modalElement.className).toBe('bestow-modal');
  });
  test('modal element is not displayed on load', () => {
    expect(modalElement.style.display).toBe('none');
  });
  test('modal element is correct height', () => {
    expect(modalElement.style.height).toBe('90%');
  });
  test('modal element is correct left', () => {
    expect(modalElement.style.left).toBe('5%');
  });
  test('modal element is correct right', () => {
    expect(modalElement.style.right).toBe('5%');
  });
  test('modal element is displayed when supplied element is clicked', () => {
    suppliedTestElement.click();
    expect(modalElement.style.display).toBe('block');
  });
  test('setup is not ran again on subsequent clicks of the supplied element', () => {
    const setupSpy = jest.spyOn(window.BestowModal, 'setup');
    suppliedTestElement.click();
    expect(setupSpy).not.toBeCalled();
  });
  test('modal element is hidden when closed', () => {
    closeElement.click();
    expect(modalElement.style.display).toBe('none');
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
    expect(closeElement.className).toBe('bestow-modal-close');
  });
  test('close element has close icon', () => {
    const closeIcon = closeElement.querySelector('.bestow-modal-close-span');
    expect(closeIcon).toBeTruthy();
    expect(closeIcon.textContent).toBe('X');
  });
});

describeIf(styleExists)('style tests', () => {
  test('style element has correct id', () => {
    expect(styleElement.id).toBe(styleElementID);
  });
});
