:warning: **This guide is a work in progress and subject to change.**

# Integration Guide

The Bestow application can be embedded inside your own hosted website. This document contains guidelines
and examples of how this can be achieved.

## Releases

Visit the link below to view current and previous releases, including links to the javascript files for each of the 
components in this guide.

https://github.com/Bestowinc/protect-lite/releases

## Prerequisites

In order to properly embed the Bestow application you must have a valid agent URL.

> :information_source: If you need an agent URL, contact your partner management representative to complete your setup with the agent
operations team.

## Browser Support

The Bestow application will work with the following browsers. Correct functionality may work in other browsers 
but is not supported or guaranteed.

* Chrome
* Firefox
* Safari
* Microsoft Edge

## Components Overview

The ability to embed the Bestow application into your website comes in several flavors. They can be combined
depending on the desired user experience.

Various javascript files (components) were created for this purpose. The goal of these javascript files are to 
reduce the amount of integration and configuration needed by partners. Making it as seamless and easy as possible 
and reducing your time to market. All components are written in plain vanilla javascript.

* [Slideout](#slideout)
* [Accordion](#accordion)
* [Modal](#modal)

## Slideout

This component embeds the Bestow application in an iframe on right-hand side of the screen.

The embedded iframe is expanded (sliding out from right to left) when a specific HTML element is clicked on the 
parent webpage. Clicking the close icon within the embedded component will close the iframe 
(sliding from right to left).

### Demo

A demonstration of the slideout component can be seen by visiting https://protect-lite.bestowlabs.com/portfolio.html 
and clicking the `Get a Quote` link within the Bestow banner.

### Setup Overview

The slideout component is created dynamically on a parent webpage by referencing a javascript file and calling a
setup function when a target element is first clicked. This setup function will...

1. Build the HTML and CSS for the slideout component.
   - iframe that loads the supplied agent URL.
2. Bind the necessary click events
    - Expand when a supplied target element is clicked.
    - Collapse when the close icon is clicked.
3. Append the HTML to the body of the parent webpage.
4. Open the slideout if needed.

The setup is only ran on the first click of the target element. Subsequent clicks of the supplied target element 
will just expand the slideout. This ensures content provided by Bestow is only loaded when needed and reduces 
unnecessary network traffic.

### Integration

The slideout component is initialized by...
1. Adding a `<script>` tag to an HTML document to load the javascript file.
2. Binding the initial `onClick` event to call the setup function.

<br/>

The `window.BestowSlideout.setup` function in the javascript file requires the following parameters.

| Parameter       | Type    | Description                                                                        |
|-----------------|---------|:-----------------------------------------------------------------------------------|
| elementSelector | string  | The id of the target element to bind `onClick` events to.                          |
| url             | string  | The agent URL pointing to the Bestow application landing page. (e.g. iframe `src`) |
| open            | boolean | Indicates if the slideout should be opened (expanded) following initialization     |

<br/>

The code below provides an example of how the slideout component can be integrated into a parent webpage.  

<br/>

> :bangbang:  Using the `latest` version in a production environment is not recommended. It could lead to undesired
> results as new features are released. Using a specific version is recommended to establish a deterministic experience.

<br/>

```html
<head>
  <title>Slideout Example</title>
  <script type="module" src='https://protect-lite.bestow.com/static/v1/iframe/slideout/bestow-slideout-latest.js'></script>
  <script>
    const bestowAppUrl = 'https://agent-quote.qa.bestow.com/e4e833b3';

    function openBestowSlideout(elementSelector) {
      window.BestowSlideout.setup(elementSelector, bestowAppUrl, true);
    }
  </script>
</head>
<body>
  <a id="get-quote-slideout" href="#" onclick='openBestowSlideout(this.id)' rel="noreferrer noopener">Get a Quote</a>
</body>
```

### Position and Size

* The slideout content will be positioned on the right-hand side of the screen when visible.
* With screen widths larger than 640px, the modal width is set to 20% of the screen size with a minimum width of 400px.
* With screen widths smaller than 640px, the modal width and height is set to 100%.

### Minimum Requirements

Below details the minimum requirements to ensure the slideout component provides an optimal user experience 
throughout the Bestow application process.

 * The HTML body MUST be set to a minimum width of 400px.

Additionally, if a mobile version of your website exists, check to make sure the Bestow content is fully scrollable
and works well on all required devices.

<br/>

## Accordion

This component provides the ability to iframe the Bestow application within a section of an HTML accordion.

The embedded iframe is displayed (expanded) when a specific HTML element is clicked on the
parent webpage. Clicking the close icon within the embedded component will collapse the iframe content. 

### Demo

A demonstration of the accordion component can be seen by visiting https://protect-lite.bestowlabs.com/portfolio.html
and clicking the "+" icon within the Bestow banner.

### Setup Overview

The content for the accordion is created dynamically on a parent webpage by referencing a javascript file and calling a
setup function. This setup function will...

1. Build the HTML and CSS for the content of a specific accordion section.
   - iframe that loads the supplied agent URL.
   - When the accordion section is visible, its contents is expanded to 100% of the supplied parent `<div>` element.
2. Bind the necessary click events
   - Expand/collapse when a supplied target element is toggled.
3. Append the HTML to the supplied accordion section (`<div>` element id) of the parent webpage.

### Integration

The accordion component is initialized by...
1. Adding a `<script>` tag to an HTML document to load the javascript file.
2. Binding an event listener to call the setup function on page load.

<br/>

The `window.BestowAccordion.setup` function in the javascript file requires the following parameters.

| Parameter       | Type   | Description                                                                                  |
|-----------------|--------|:---------------------------------------------------------------------------------------------|
| contentDiv      | string | The id of the target `<div>` element that will contain the iframe content.                   |
| elementSelector | string | The id of the target element to bind click events to for section toggling (expand/collapse). |
| url             | string | The agent URL pointing to the Bestow application landing page. (e.g. iframe `src`)           |

<br/>

The code below provides an example of how the accordion component can be integrated into a parent webpage.

<br/>

> :bangbang:  Using the `latest` version in a production environment is not recommended. It could lead to undesired
> results as new features are released. Using a specific version is recommended to establish a deterministic experience.

<br/>

```html
<head>
  <title>Accordion Example</title>
  <script type="module" src='https://protect-lite.bestow.com/static/v1/iframe/accordion/bestow-accordion-latest.js'></script>
  <script>
    const bestowAppUrl = 'https://agent-quote.qa.bestow.com/e4e833b3';

    document.addEventListener('DOMContentLoaded', () => {
       window.BestowAccordion.setup("life-insurance-accordion-content", "life-insurance-button", bestowAppUrl);
    });
  </script>
</head>
<body>
   <button id="life-insurance-button" class="life-insurance-button">Life Insurance</button>
   <div id="life-insurance-accordion-content" class="life-insurance-accordion-content"></div>
</body>
```

### Position and Size

* Content will be positioned within the supplied `<div>` element (using the element id).
* Content will take up 100% of the parent element horizontally and vertically.

### Minimum Requirements

Below details the minimum requirements to ensure the accordion component provides an optimal user experience
throughout the Bestow application process.

* The `<div>` element containing the iframe content MUST be set with...
  * A minimum width of 400px.
  * A minimum height of 500px.

Additionally, if a mobile version of your website exists, check to make sure the Bestow content is fully scrollable
and works well on all required devices.

<br/>

## Modal

This component embeds the Bestow application in an iframe in the center of the screen.

The embedded iframe is expanded (popped up) when a specific HTML element is clicked on the
parent webpage. Clicking the close icon within the embedded component will close the iframe.

### Demo

A demonstration of the modal component can be seen by visiting https://protect-lite.bestowlabs.com/portfolio.html
and clicking the `Life Insurance` link at the bottom of the page.

### Setup Overview

The modal component is created dynamically on a parent webpage by referencing a javascript file and calling a
setup function when a target element is first clicked. This setup function will...

1. Build the HTML and CSS for the modal component.
    - iframe that loads the supplied agent URL.
2. Bind the necessary click events
    - Expand when a supplied target element is clicked.
    - Collapse when the close icon is clicked.
3. Append the HTML to the body of the parent webpage.
4. Open the modal if needed.

The setup is only ran on the first click of the target element. Subsequent clicks of the supplied target element
will just expand the modal. This ensures content provided by Bestow is only loaded when needed and reduces
unnecessary network traffic.

### Integration

The modal component is initialized by...
1. Adding a `<script>` tag to an HTML document to load the javascript file.
2. Binding the initial `onClick` event to call the setup function.

<br/>

The `window.BestowModal.setup` function in the javascript file requires the following parameters.

| Parameter       | Type    | Description                                                                        |
|-----------------|---------|:-----------------------------------------------------------------------------------|
| elementSelector | string  | The id of the target element to bind `onClick` events to.                          |
| url             | string  | The agent URL pointing to the Bestow application landing page. (e.g. iframe `src`) |
| open            | boolean | Indicates if the modal should be opened (expanded) following initialization        |

<br/>

The code below provides an example of how the modal component can be integrated into a parent webpage.

<br/>

> :bangbang:  Using the `latest` version in a production environment is not recommended. It could lead to undesired
> results as new features are released. Using a specific version is recommended to establish a deterministic experience.

<br/>

```html
<head>
  <title>Modal Example</title>
  <script type="module" src='https://protect-lite.bestow.com/static/v1/iframe/modal/bestow-modal-latest.js'></script>
  <script>
    const bestowAppUrl = 'https://agent-quote.qa.bestow.com/e4e833b3';

    function openBestowModal(elementSelector) {
       window.BestowModal.setup(elementSelector, bestowAppUrl, true);
    }
  </script>
</head>
<body>
  <a id="get-quote-modal" href="#" onclick='openBestowModal(this.id)' rel="noreferrer noopener">Get a Quote</a>
</body>
```

### Position and Size

* Content will be positioned in the center of screen horizontally and vertically.
* With screen widths larger than 640px, the modal width is set to 640px.
* With screen widths smaller than 640px, the modal width and height is set to 100%.

### Minimum Requirements

Below details the minimum requirements to ensure the modal component provides an optimal user experience
throughout the Bestow application process.

* The HTML body MUST be set to a minimum width of 400px.

Additionally, if a mobile version of your website exists, check to make sure the Bestow content is fully scrollable
and works well on all required devices.

<br/>
