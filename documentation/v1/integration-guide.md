:warning: **This guide is a work in progress and subject to change.**

The Bestow application can be embedded inside your own hosted website. This document contains guidelines
and examples of how this can be achieved.

## Prerequisites

In order to properly embed the Bestow application you must have a valid agent URL.

> If you need an agent URL, contact your partner management representative to complete your setup with the agent
operations team.

## Browser Support

The Bestow application will work with the following browsers. Correct functionality may work in other browsers 
but is not supported or guaranteed.

* Chrome
* Firefox
* Safari
* Microsoft Edge

## Available Components

The ability to embed the Bestow application into your website comes in several flavors. They can be combined 
depending on the desired user experience.

You can view the various releases, including links to each of the components javascript files, by visiting...

https://github.com/Bestowinc/protect-lite/releases

### 1. Slideout

This component embeds the Bestow application in an iframe on right-hand side of the screen.

The embedded iframe is expanded (sliding out from right to left) when a specific HTML element is clicked on the 
parent webpage. Clicking the close icon within the embedded component will close the iframe 
(sliding from right to left).

#### Demo

A demonstration of the Slideout component can be seen by visiting https://protect-lite.bestowlabs.com/portfolio.html 
and clicking the "Get a Quote" link

#### Setup Overview

The slideout component is created dynamically on a parent webpage by referencing a javascript file and calling a
setup function when a target element is first clicked. This setup function will...

1. Build the HTML and CSS for the slideout component.
   - iframe that loads the supplied agent URL.
2. Bind the necessary click events
    - Expand when a supplied target element is clicked.
    - Collapse when the close icon is clicked.
3. Appends the HTML to the body of the parent webpage.
4. Open the slide out if needed.

The setup is only ran on the first click of the target element. Subsequent clicks of the supplied target element 
will just expand the slideout. This ensures content provided by Bestow is only loaded when needed and reduces 
unnecessary network traffic.

## Integration

The Slideout component is initialized by...
1. Adding a `<script>` tag to an HTML document to load the javascript file.
2. Binding the initial `onClick` event to call the setup function.

The `window.BestowSlideout.setup` function in the javascript file requires the following parameters.

| Parameter       | Type    | Description                                                                       |
|-----------------|---------|:----------------------------------------------------------------------------------|
| elementSelector | string  | The id of the target element to bind `onClick` events to.                         |
| url             | string  | The agent URL pointing to the Bestow application landing page.<br/>(iframe `src`) |
| open            | boolean | Indicates if the slideout should be opened (expanded) following initialization    |

The code below provides an example of how the slideout component can be integrated into a parent webpage.

> NOTE: Using the `latest` version in a production environment is not recommended. It could lead to undesired
> results as new features are released. Using a specific version is recommended to establish a deterministic experience.

```html
<head>
  <title>Slideout Example</title>
  <script type="module" src='https://protect-lite.bestow.com/static/v1/iframe/slideout/bestow-slideout-latest.js'></script>
  <script>
    const bestowAppUrl = 'https://agent-quote.qa.bestow.com/e4e833b3';

    function openBestow(elementSelector) {
      window.BestowSlideout.setup(elementSelector, bestowAppUrl, true);
    }
  </script>
</head>
<body>
  <a id="get-quote" href="#" onclick='openBestow(this.id)' rel="noreferrer noopener">Get a Quote</a>
</body>
```

#### Minimum Requirements

Below details the minimum requirements to ensure the Slideout component provides an optimal user experience 
throughout the Bestow application process.

 * The HTML body MUST be set to a minimum width of 400px.

Additionally, if a mobile version of your website exists, check to make sure the Bestow content is fully scrollable
and works well on all required devices.
