require('./bestow-iframe');

const describeIf = condition => condition ? describe : describe.skip;

const testURL = "https://somegarbage.bestow.com";
const testElementID = "some_id";

const iframeElementID = "bestow-frame";
const gutterElementID = "bestow-gutter";
const closeElementID = "bestow-close";
const styleElementID = "bestow-styling";

document.body.innerHTML += `
        <a id="${testElementID}" href="#" rel="noreferrer noopener">
          <span>Get a Quote</span>
        </a>
    `;

window.Bestow.setup(`#${testElementID}`, testURL);

console.log(document.documentElement.innerHTML)

let gutterElement = document.getElementById(gutterElementID);
let iframeElement = document.getElementById(iframeElementID);
let closeElement = document.getElementById(closeElementID);
let styleElement = document.getElementById(styleElementID)

describe("elements exist", () => {
    test('gutter element exists', () => {
        expect(gutterElement).toBeTruthy();
    });

    test('iframe element exists', () => {
        expect(iframeElement).toBeTruthy();
    });

    test('close element exists', () => {
        expect(closeElement).toBeTruthy();
    });

    test('style element exists', () => {
        expect(styleElement).toBeTruthy();
    });
});

const gutterExists = gutterElement !== null;
const iframeExists = iframeElement !== null;
const closeExists = closeElement !== null;
const styleExists = styleElement !== null;

describeIf(gutterExists)('gutter tests', () => {
    afterAll(() => {
        if (closeExists) {
            closeElement.click();
        }
    });

    test("gutter element has correct id", () => {
        expect(gutterElement.id).toBe(gutterElementID);
    });
    test("gutter element has correct class name", () => {
        expect(gutterElement.className).toBe('gutter');
    });
});

describeIf(iframeExists)('iframe tests', () => {
    afterAll(() => {
        if (closeExists) {
            closeElement.click();
        }
    });

    test("iframe element has correct id", () => {
        expect(iframeElement.id).toBe(iframeElementID);
    })
});

describeIf(closeExists)('close tests', () => {
    afterAll(() => {
        if (closeExists) {
            closeElement.click();
        }
    });

    test("close element has correct id", () => {
        expect(closeElement.id).toBe(closeElementID);
    })
});

describeIf(styleExists)('style tests', () => {
    test("style element has correct id", () => {
        expect(styleElement.id).toBe(styleElementID);
    })
});

// describe("test setup", () => {
//
//
//
//     const shouldSkip = () => !shouldRun
//     const skipIf = () => this.skip()
//
//
//
//     testIf(shouldRun)('supplied element click event opens gutter', () => {
//         const suppliedElement = document.getElementById(testElementID);
//         expect(suppliedElement).toBeTruthy();
//
//         suppliedElement.click();
//
//         const frame = document.getElementById("bestow-frame");
//         const gutter = document.getElementById("bestow-gutter");
//         const closeElem = document.getElementById("bestow-close");
//
//         expect(suppliedElement.onclick.name).toEqual('openGutter')
//     });
//
//     testIf(shouldRun)('iframe element exists', () => {
//         const iframeElem = document.getElementById(iframeElementID);
//         expect(iframeElem).toBeTruthy();
//     });
//
// });
