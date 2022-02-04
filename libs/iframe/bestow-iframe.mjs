// Inline the contents of the css file as plain text.
// See https://parceljs.org/features/bundle-inlining/
import styling from 'bundle-text:./styles.css';

const openGutter = url => () => {
    const frame = document.getElementById('bestow-frame');
    const gutter = document.getElementById('bestow-gutter');
    const closeElem = document.getElementById('bestow-close');

    frame.setAttribute('src', url);
    closeElem.style.display = 'block';
    gutter.style.display = 'block';

    return false;
};

const closeGutter = () => () => {
    const gutter = document.getElementById('bestow-gutter');
    const closeElem = document.getElementById('bestow-close');

    /* Disable slideout visuals */
    closeElem.style.display = 'none';
    gutter.style.display = 'none';
};

function setupBestow(elementSelector, url) {
    const hostElem = document.querySelector(elementSelector);

    if (!hostElem) {
        console.error(`Couldn't find element to bind to`);
        return;
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
    frameElem.allow = 'payment';
    frameElem.src = url;
    gutterElem.appendChild(frameElem);
    document.body.appendChild(gutterElem);


}

window.Bestow = { setup: setupBestow };
