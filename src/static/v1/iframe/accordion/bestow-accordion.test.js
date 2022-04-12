/* eslint-disable */
require('./bestow-accordion.js');

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
const testDivID = 'some_div_id';

const iframeElementID = 'bestow-accordion-iframe';
const styleElementID = 'bestow-accordion-styling';

document.body.innerHTML += `
    <div id="${testDivID}">
        <a id="${testElementID}" href="#" rel="noreferrer noopener">
            <span>Get a Quote</span>
        </a>
    </div>
`;

let setupError;
try {
  window.BestowAccordion.setup(testDivID, testElementID, testURL, testParams);
} catch (e) {
  setupError = e;
}

describe('test setup', () => {
  test('error when supplied div does not exist', () => {
    let err;
    try {
      window.BestowAccordion.setup(
        '#garbage1',
        '#garbage2',
        testURL,
        testParams,
      );
    } catch (e) {
      err = e;
    }
    expect(err).toBeTruthy();
    expect(err.message).toBe(
      'Supplied content div for the bestow-accordion could not be found. Please consult integration guide at: https://github.com/Bestowinc/protect-lite/blob/main/documentation/v1/integration-guide.md',
    );
  });
  test('error when supplied element does not exist', () => {
    let err;
    try {
      window.BestowAccordion.setup(testDivID, '#garbage', testURL, testParams);
    } catch (e) {
      err = e;
    }
    expect(err).toBeTruthy();
    expect(err.message).toBe(
      'Supplied bestow-accordion toggle selector could not be found. Please consult integration guide at: https://github.com/Bestowinc/protect-lite/blob/main/documentation/v1/integration-guide.md',
    );
  });
  test('error when supplied params is not an object', () => {
    let err;
    try {
      window.BestowAccordion.setup(testDivID, testElementID, testURL, 'test');
    } catch (e) {
      err = e;
    }
    expect(err).toBeTruthy();
    expect(err.message).toBe(
      'Params variable passed into the bestow-accordion is not a valid object. Please consult integration guide at: https://github.com/Bestowinc/protect-lite/blob/main/documentation/v1/integration-guide.md',
    );
  });
  test('setup is successful', () => {
    expect(setupError).toBeFalsy();
  });
});

console.log(document.documentElement.innerHTML);

const suppliedTestDiv = document.getElementById(testDivID);
const suppliedClickElement = document.getElementById(testElementID);
const iframeElement = document.getElementById(iframeElementID);
const styleElement = document.getElementById(styleElementID);

const suppliedDivExists = suppliedTestDiv !== null;
const suppliedClickElemExists = suppliedClickElement !== null;
const iframeExists = iframeElement !== null;
const styleExists = styleElement !== null;

describe('elements exist', () => {
  test('supplied click element exists', () => {
    expect(suppliedClickElemExists).toBeTruthy();
  });

  test('iframe element exists', () => {
    expect(iframeExists).toBeTruthy();
  });

  test('style element exists', () => {
    expect(styleExists).toBeTruthy();
  });

  test('accordionClose exists on supplied div', () => {
    expect(suppliedTestDiv.classList.contains('accordionClose')).toBeTruthy;
  });
});

describeIf(suppliedDivExists)('div tests', () => {
  test('div element has correct id', () => {
    expect(suppliedTestDiv.id).toBe(testDivID);
  });

  test('div contains class accordionClose on load', () => {
    expect(suppliedTestDiv.classList.contains('accordionClose')).toBeTruthy;
  });

  test('div does not have accordionClose on click', () => {
    suppliedClickElement.click();
    expect(suppliedTestDiv.classList.contains('accordionClose')).toBeFalsy;
  });

  test('div has accordionClose when clicked again', () => {
    suppliedClickElement.click(); // again to close
    expect(suppliedTestDiv.classList.contains('accordionClose')).toBeTruthy;
  });
});

describeIf(iframeExists)('iframe tests', () => {
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
});

describeIf(styleExists)('style tests', () => {
  test('style element has correct id', () => {
    expect(styleElement.id).toBe(styleElementID);
  });
});
