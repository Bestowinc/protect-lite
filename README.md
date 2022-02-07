# Protect Lite

This repository is home of all things Protect Lite.

Protect Lite allows partners to give customers access to Bestow’s term life offering, without ever routing 
customers off their platform. This can be achieved by embedding bestow directly into the partner's website.

## Demos

Several demos were created for the purposes of showing how the Bestow application can be embedded.

### POC

This is a very basic proof of concept created to show that Protect Lite was possible via an iFrame.

### Tomito

The Tomito demo website was created for partners to see how Protect Lite works. A playground to see how the 
Bestow application can be embedded with a dummy parent site.

It utilizes javascript libraries (See [Libraries](#libraries)) to show easy configuration.

The demo site is built with [Parcel](https://parceljs.org/).

#### Environments

| Environment | URL                                    |
|-------------|----------------------------------------|
| QA          | https://protect-lite.qa.bestowlabs.com |
| Prod        | TBD                                    |

#### Running Locally

* Run `yarn demo-local`
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

Partners can integate the library into their website like this...

```html
<head>
  <title>Partner Site</title>
  <script type="module" src='https://protect-lite.qa.bestowlabs.com/libs/iframe/bestow-iframe.js'></script>\
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

| Param           | Description                                                                                          |
|-----------------|------------------------------------------------------------------------------------------------------|
| elementSelector | The id of the html element that will be bound to an `onclick` event for opening the iFrame.          |
| url             | The agent url to be loaded in the iframe (`src` attribute). Throws an error if element is not found. |


#### Files

Below details the files hosted for the iFrame javascript library.

| Environment | Files                                                                                                                                             |
|-------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| QA          | https://protect-lite.qa.bestowlabs.com/libs/iframe/bestow-iframe.js <br/> https://protect-lite.qa.bestowlabs.com/libs/iframe/bestow-iframe.js.map |
| Prod        | TBD                                                                                                                                               |
