#!/usr/bin/env node

const fs = require('fs');
const {execSync} = require('child_process');

fs.rmSync('./build/libs/iframe', { force: true, recursive: true});
TEMPDIR="./tmp"
fs.mkdirSync(TEMPDIR, { recursive: true });
//trap 'rimraf "$TEMPDIR"' EXIT

// Set versioned library file names.
SLIDEOUT_FILE_VERSIONED="bestow-slideout"
ACCORDION_FILE_VERSIONED="bestow-accordion"
if (process.env.BUILD_VERSION_V1) {
  SLIDEOUT_FILE_VERSIONED += `-${process.env.BUILD_VERSION_V1}.js`
  ACCORDION_FILE_VERSIONED += `-${process.env.BUILD_VERSION_V1}.js`
} else {
  SLIDEOUT_FILE_VERSIONED += ".js"
  ACCORDION_FILE_VERSIONED += ".js"
}

// Build slideout
fs.cpSync("./src/libs/iframe/slideout/", `${TEMPDIR}/slideout`, { recursive: true })
fs.renameSync(`${TEMPDIR}/slideout/bestow-slideout.js`, `${TEMPDIR}/slideout/bestow-slideout-latest.js`)
execSync(`parcel build "${TEMPDIR}/slideout/bestow-slideout-latest.js" --dist-dir build/libs/iframe/slideout --no-cache`)
fs.renameSync(`${TEMPDIR}/slideout/bestow-slideout-latest.js`, `${TEMPDIR}/slideout/${SLIDEOUT_FILE_VERSIONED}`)
execSync(`parcel build "${TEMPDIR}/slideout/${SLIDEOUT_FILE_VERSIONED}" --dist-dir build/libs/iframe/slideout --no-cache`)

// Build accordion
fs.cpSync("./src/libs/iframe/accordion/", `${TEMPDIR}/accordion`, { recursive: true })
fs.renameSync(`${TEMPDIR}/accordion/bestow-accordion.js`, `${TEMPDIR}/accordion/bestow-accordion-latest.js`)
execSync(`parcel build "${TEMPDIR}/accordion/bestow-accordion-latest.js" --dist-dir build/libs/iframe/accordion --no-cache`)
fs.renameSync(`${TEMPDIR}/accordion/bestow-accordion-latest.js`, `${TEMPDIR}/accordion/${ACCORDION_FILE_VERSIONED}`)
execSync(`parcel build "${TEMPDIR}/accordion/${ACCORDION_FILE_VERSIONED}" --dist-dir build/libs/iframe/accordion --no-cache`)
