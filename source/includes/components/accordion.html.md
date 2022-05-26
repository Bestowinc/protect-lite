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
   * iframe that loads the supplied agent URL.
   * When the accordion section is visible, its contents is expanded to 100% of the supplied parent `<div>` element.
2. Bind the necessary click events
   * Expand/collapse when a supplied target element is toggled.
3. Append the HTML to the supplied accordion section (`<div>` element id) of the parent webpage.

### Integration

The accordion component is initialized by...
1. Adding a `<script>` tag to an HTML document to load the javascript file.
2. Binding an event listener to call the setup function on page load.

<br/>

The `window.BestowAccordion.setup` function in the javascript file requires the following parameters.

| Parameter       | Type    | Required | Description                                                                        |
|-----------------|---------|----------|:-----------------------------------------------------------------------------------|
| contentDiv      | string  | yes      | The id of the target `<div>` element that will contain the iframe content.         |
| elementSelector | string  | yes      | The id of the target element to bind `onClick` events to.                          |
| url             | string  | yes      | The agent URL pointing to the Bestow application landing page. (e.g. iframe `src`) |
| params          | object  | no       | Parameters object specific to iframed [widget](#widgets)                           |

<br/>

The code below provides an example of how the accordion component can be integrated into a parent webpage.

<br/>

<aside class="warning"> Using the `latest` version in a production environment is not recommended. It could lead to undesired results as new features are released. Using a specific version is recommended to establish a deterministic experience. </aside>

<br/>

```html
<head>
  <title>Accordion Example</title>
  <script type="module" src='https://protect-lite.bestow.com/static/v1/iframe/accordion/bestow-accordion-latest.js'></script>
  <script>
    const bestowAppUrl = 'https://agent-quote.qa.bestow.com/e4e833b3';

    const quoteParams = {
      gender: 'female',
      height: '69',
      weight: 120,
      tobacco: 'no',
      date_of_birth: '1998-01-01',
      zip: '77386'
    };

    document.addEventListener('DOMContentLoaded', () => {
       window.BestowAccordion.setup("life-insurance-accordion-content", "life-insurance-button", bestowAppUrl, quoteParams);
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
