# Protect Lite

This repository is home of all things Protect Lite.

Protect Lite allows partners to give customers access to Bestow’s term life offering, without ever routing 
customers off their platform. This can be achieved by embedding bestow directly into the partner's website.

## Setup

In order to run/develop locally, npm must be installed. 

Then run the following command from the project root directory to install all required packages.
* `npm install`

## Tools Used

| Tool                                         | Purpose                                                                                       |
|----------------------------------------------|-----------------------------------------------------------------------------------------------|
| [Parcel](https://parceljs.org/)              | Building the libraries and demo. (Compiled with [Babel](https://babeljs.io) under the covers) |
| [Jest](https://jestjs.io/)                   | Unit testing javascript code. Ran in CircleCi pipeline and as a pre-push git hook.            |
| [ESLint](https://eslint.org/)                | Linting javascript code. Ran as a pre-commit git hook.                                        |
| [Prettier](https://prettier.io/)             | Code formatter. Ran as a pre-commit git hook.                                                 |
| [Husky](https://typicode.github.io/husky/#/) | Configure git hooks.                                                                          |
| [PostHTML](https://posthtml.org/#/)          | Transform HTML based on node environment.                                                     |

## Demos

Several demos were created for the purposes of showing how the Bestow application can be embedded.

### POC

This is a very basic proof of concept created to show that Protect Lite was possible via an iFrame.

### Tomito

The Tomito demo website was created for partners to see how Protect Lite works. A playground to show how the 
Bestow application can be embedded into a dummy parent site.

It utilizes javascript libraries (See [Libraries](#libraries)) to show easy integration.

The demo site is built with [Parcel](https://parceljs.org/).

#### Environments

| Environment | URL                                    |
|-------------|----------------------------------------|
| QA          | https://protect-lite.qa.bestowlabs.com |
| Prod        | TBD                                    |

PostHTML is utilized to inject variables into HTML based on the node environment at build time. This allows html to be 
transformed with values based node environments. e.g. Agent urls, bestow environment urls, etc. 

The environment utilized is controlled by setting the `NODE_ENV` environment variable at build time.

For example, `NODE_ENV=qa npm run build-demo` will inject variables from the `.env.qa` file into the demos html.

See [Parcel environment variables](https://en.parceljs.org/env.html), 
[PostHTML expressions](https://github.com/posthtml/posthtml-expressions)

#### Running Locally

* Run `npm run run-demo`
* Open http://localhost:4000
* Enter a fake username/password and click the `Login` button.
* Under the Bestow banner, click the `Get a Quote` link to open application in an iFrame.

## Libraries 

Various libraries were created to allow partners to easily embed the Bestow applictation into their website. 
The goal of these libraries are to reduce the amount of integration and configuration needed by 
partners. Making it as seamless and easy as possible and reducing their time to market.

The libraries are...
* Written in vanilla javascript
* Built using [Parcel](https://parceljs.org/) (Compiled with [Babel](https://babeljs.io) under the covers)
* Tested with [Jest](https://jestjs.io/)
* Deployed to each environment under the libs path.(e.g. {url}/libs/{type}/bestow-{type}.js)


### iFrame

This library creates the necessary html elements and styling for the Bestow application to operate within an iFrame. 
All elements are created at the bottom of the existing `body`.

Partners can integrate the library into their existing website like this...

```html
<head>
  <title>Partner Site</title>
  <script type="module" src='https://protect-lite.qa.bestowlabs.com/libs/iframe/slideout/bestow-slideout.js'></script>\
  <script>
      const bestowAppUrl = "https://enroll.qa.bestow.com/";
    
      document.addEventListener('DOMContentLoaded', () => {
        window.Bestow.setup("get-quote", bestowAppUrl);
      });
  </script>
</head>
```

This downloads and executes the library javascript when the page is loaded.

The `setup` function takes the following parameters.

| Param           | Description                                                                                              |
|-----------------|----------------------------------------------------------------------------------------------------------|
| elementSelector | The id of the html element that will be bound to an `onclick` event for opening the iFrame.              |
| url             | The agent url to be loaded in the iframe (`src` attribute). Throws an error if the element is not found. |


#### Files

Below details the files hosted for the iFrame javascript library.

| Environment | Files                                                                                                                                             |
|-------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| QA          | https://protect-lite.qa.bestowlabs.com/libs/iframe/bestow-iframe.js <br/> https://protect-lite.qa.bestowlabs.com/libs/iframe/bestow-iframe.js.map |
| Prod        | TBD                                                                                                                                               |
