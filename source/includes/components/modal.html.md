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
    * iframe that loads the supplied agent URL.
2. Bind the necessary click events
    * Expand when a supplied target element is clicked.
    * Collapse when the close icon is clicked.
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

| Parameter       | Type    | Required | Description                                                                        |
|-----------------|---------|----------|:-----------------------------------------------------------------------------------|
| elementSelector | string  | yes      | The id of the target element to bind `onClick` events to.                          |
| url             | string  | yes      | The agent URL pointing to the Bestow application landing page. (e.g. iframe `src`) |
| params          | object  | no       | Parameters object specific to iframed [widget](#widgets)                           |
| open            | boolean | no       | Indicates if the modal should be opened (expanded) following initialization        |
| size            | number  | no       | Percentage of screen that you want the modal to occupy. Range between 10-90. Default 90 |

<br/>

The code below provides an example of how the modal component can be integrated into a parent webpage.

<br/>

<aside class="warning"> Using the `latest` version in a production environment is not recommended. It could lead to undesired results as new features are released. Using a specific version is recommended to establish a deterministic experience. </aside>

<br/>

```html
<head>
  <title>Modal Example</title>
  <script type="module" src='https://protect-lite.bestow.com/static/v1/iframe/modal/bestow-modal-latest.js'></script>
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

    function openBestowModal(elementSelector) {
       window.BestowModal.setup(elementSelector, bestowAppUrl, quoteParams, true);
    }
  </script>
</head>
<body>
  <a id="get-quote-modal" href="#" onclick='openBestowModal(this.id)' rel="noreferrer noopener">Get a Quote</a>
</body>
```

### Position and Size

* Content will be positioned in the center of screen horizontally and vertically.
* When screen sizes are 400px or smaller, the modal...
  * Width is set to 100%.
  * Minimum width is 360px.
* When screen sizes are 800px or larger, the modal...
  * Width is a percentage of the entire screen.
  * Minimum width is 600px.

### Minimum Requirements

Below details the minimum requirements to ensure the modal component provides an optimal user experience
throughout the Bestow application process.

* The HTML body MUST be set to a minimum width of 400px.

Additionally, if a mobile version of your website exists, check to make sure the Bestow content is fully scrollable
and works well on all required devices.

<br/>
