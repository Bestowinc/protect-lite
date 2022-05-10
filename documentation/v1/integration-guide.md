:warning: **This guide is a work in progress and subject to change.**

# Integration Guide

The Bestow application can be embedded inside your own hosted website. This document contains guidelines
and examples of how this can be achieved.

## Releases

Visit the link below to view current and previous releases, including links to the javascript files for each of the 
components in this guide.

[Releases](https://github.com/Bestowinc/protect-lite/releases)

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

## Widgets

<br/>

### Quote

**Creating a Quote**

Every insurance policy begins with a quote. You can think of quotes as templates that eventually turn into policies if a user decides to buy. Quotes are used to indicate the terms of the policy and the price (premium) associated with it.

When calculating policy prices, we take many attributes into consideration, such as the user's age, gender, height, weight and status. You’ll need to include this information when creating a quote through the API.

**Url:** https://agent-quote.bestow.com/<agentId>

**Parameters**

| Parameter       | Required | Description                                                                        |
|-----------------|----------|:-----------------------------------------------------------------------------------|
| date_of_birth   | no       | Prefill `Birthdate` field. Total height in inches                                  |
| gender          | no       | Prefill `Gender` field. "male" or "female"                                         |
| height          | no       | Prefill `Height` field. Total height in inches                                     |
| tobacco         | no       | Prefill `Tobacco` field. "yes" or "no"                                             |
| weight          | no       | Prefill `Weight` field. Total weight in lbs                                        |
| zip             | no       | Prefill `Zip Code` field. 5 digit zipcode value                                    |

<br/>

### Enrollment

**Creating an Enrollment**

Enrollment is the application process of purchasing a policy. An application is a collection of data about a customer that is used to determine whether we would like to sell them a life insurance policy. It is a request to be considered for an insurance policy. A customer ***applies*** for a policy. Just because they apply does not mean they will be issued a policy.

Applications are created when a customer creates an account and ends upon an underwriting decision.

**Url:** https://enroll.bestow.com/

**Parameters**

| Parameter       | Required | Description                                                                        |
|-----------------|----------|:-----------------------------------------------------------------------------------|
| date_of_birth   | no       | Prefill `Birthdate` field. Total height in inches                                  |
| gender          | no       | Prefill `Gender` field. "male" or "female"                                         |
| height          | no       | Prefill `Height` field. Total height in inches                                     |
| tobacco         | no       | Prefill `Tobacco` field. "yes" or "no"                                             |
| weight          | no       | Prefill `Weight` field. Total weight in lbs                                        |
| zip             | no       | Prefill `Zip Code` field. 5 digit zipcode value                                    |
| quoteid         | no       | Pass in previous quote id. *date_of_birth, gender, height, tobacco, weight and zip will be prefilled with previous information provided during quote.* |

## Slideout

This component embeds the Bestow application in an iframe on right-hand side of the screen.

The embedded iframe is expanded (sliding out from right to left) when a specific HTML element is clicked on the 
parent webpage. Clicking the close icon within the embedded component will close the iframe 
(sliding from right to left).

### Demo

A demonstration of the slideout component can be seen by visiting https://protect-lite.bestowlabs.com/portfolio 
and clicking the `Get a Quote` link within the Bestow banner.

### Setup Overview

The slideout component is created dynamically on a parent webpage by referencing a javascript file and calling a
setup function when a target element is first clicked. This setup function will...

1. Build the HTML and CSS for the slideout component.
   * iframe that loads the supplied agent URL.
2. Bind the necessary click events
    * Expand when a supplied target element is clicked.
    * Collapse when the close icon is clicked.
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

| Parameter       | Type    | Required | Description                                                                        |
|-----------------|---------|----------|:-----------------------------------------------------------------------------------|
| elementSelector | string  | yes      | The id of the target element to bind `onClick` events to.                          |
| url             | string  | yes      | The agent URL pointing to the Bestow application landing page. (e.g. iframe `src`) |
| params          | object  | no       | Parameters object specific to iframed [widget](#widgets)                           |
| open            | boolean | no       | Indicates if the slideout should be opened (expanded) following initialization     |
| anchorLeft      | boolean | no       | Indicates whether the slideout should be anchored to the left side of the screen   |

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

    const quoteParams = {
      gender: 'female',
      height: '69',
      weight: 120,
      tobacco: 'no',
      date_of_birth: '1998-01-01',
      zip: '77386'
    };

    function openBestowSlideout(elementSelector) {
      window.BestowSlideout.setup(elementSelector, bestowAppUrl, quoteParams, true, false);
    }
  </script>
</head>
<body>
  <a id="get-quote-slideout" href="#" onclick='openBestowSlideout(this.id)' rel="noreferrer noopener">Get a Quote</a>
</body>
```

### Position and Size

* The slideout content will be positioned on the right-hand side of the screen when visible.
* When screen sizes are 500px or smaller, the modal...
    * Width is set to 100%.
    * Minimum width is 360px.
* When screen sizes are larger than 500px, the modal...
    * Width is a percentage of the entire screen.
    * Minimum width is 400px.

### Minimum Requirements

Below details the minimum requirements to ensure the slideout component provides an optimal user experience 
throughout the Bestow application process.

 * The HTML body MUST be set to a minimum width of 400px.

Additionally, if a mobile version of your website exists, check to make sure the Bestow content is fully scrollable
and works well on all required devices.

<br/>

### Major Frameworks intergration (React)

While the Slideout component is plug and play, there are a few steps to be completed to optimize it for popular javascript frameworks, such as [React](https://github.com/facebook/create-react-app).

Utilize the method that works best for loading scripts into your application, using a popular library such as [react-helmet](https://github.com/nfl/react-helmet) or a custom loader function like the example provided below at the top of your parent page:

<br/>

```javascript
  useEffect(() => {
    const slideoutScript = document.createElement('script');
    slideoutScript.src = `https://protect-lite.bestow.com/static/v1/iframe/slideout/bestow-slideout-latest.js`;
    slideoutScript.async = true;
    document.body.appendChild(slideoutScript);
  }, []);
```

<br/>

In the example above, we utilize a popular React hook called: useEffect, so that the script is loaded at the time of page load. 

<br/>


```javascript
 const openBestowSlideout = () => {
    window.BestowSlideout.setup(
      'get-quote-slideout',
      process.env.REACT_APP_AGENT_URL,
      currentUser,
      true,
    );
  };
  return(
    <button
      id="get-quote-slideout"
      onClick={openBestowSlideout}
    >
      Get a Quote
    </button>
  )
```

<br/>

In the above example we assign `openBestowSlideout`, to the BestowSlideout setup function so that we can assign an onClick event to the `<button id="get-quote-modal" onClick={openBestowSlideout}>`. Doing so causes the BestowSlideout setup function to invoke when the button is clicked, allowing the iframe to handle creating the iframe DOM element and handling logic. We have created the `currentUser` variable used in this example. As stated earlier in this guide, this parameter is an optional object that will prefill information into the iframe. The best way for React to track the changes and re-render the iframe with updated information is to set this object to a trackable state object. We also pass an ENV variable `process.env.REACT_APP_AGENT_URL` in the function to handle the required Agent URL. Coming from a `.env` file that manages "secrets."

## Accordion

This component provides the ability to iframe the Bestow application within a section of an HTML accordion.

The embedded iframe is displayed (expanded) when a specific HTML element is clicked on the
parent webpage. Clicking the close icon within the embedded component will collapse the iframe content. 

### Demo

A demonstration of the accordion component can be seen by visiting https://protect-lite.bestowlabs.com/portfolio
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

> :bangbang:  Using the `latest` version in a production environment is not recommended. It could lead to undesired
> results as new features are released. Using a specific version is recommended to establish a deterministic experience.

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

### Major Frameworks intergration (React)

While the accordion component is plug and play, there are a few steps to be completed to optimize it for popular javascript frameworks, such as [React](https://github.com/facebook/create-react-app).

Utilize the method that works best for loading scripts into your application, using a popular library such as [react-helmet](https://github.com/nfl/react-helmet) or a custom loader function like the example provided below at the top of your parent page:

<br/>

```javascript
  useEffect(() => {
    const accordionScript = document.createElement('script');
    accordionScript.src = `https://protect-lite.bestow.com/static/v1/iframe/accordion/bestow-accordion-latest.js`;
    accordionScript.async = true;
    accordionScript.addEventListener('load', () => setLoaded(true));
    document.body.appendChild(accordionScript);
  }, []);
```
<br/>

In the example above, we utilize a popular React hook called: useEffect, so that the script is loaded at the time of page load. We are also utilizing state to track when the script is fully loaded by using `setLoaded(true)` so that react triggers a re-render in order to replace the `<div id="life-insurance-accordion-content">` and display the new accordion component instead.

For React to track the DOM changes, our examples recommend wrapping the accordion content in a separate React component and passing it a `loaded` state variable prop that we previously set while loading the script. Because of this, the component can re-render when its props change and the accordion has replaced the DOM element.

```javascript
const AccordionContainer = ({ currentUser, loaded }) => {
  useEffect(() => {
    window.BestowAccordion?.setup(
      'life-insurance-accordion-content',
      'life-insurance-button',
      process.env.REACT_APP_AGENT_URL,
      currentUser,
    );
  }, [currentUser, loaded]);

  return (
    <div
      id="life-insurance-accordion-content"
      className="bg-white"
      style={{ height: '500px' }}
    ></div>
  );
};
```
<br/>

We again utilize the useEffect hook to run the `BestowAccordion` setup function and display the updated accordion component anytime the React component is updated. We are also passing in a currentUser argument, as an example, for any prefilled information you would like to pass to the iframe. Passing in this information also let's React re-render if new, optional, prefill information is passed to the React component. We have created the `currentUser` variable used in this example. As stated earlier in this guide, this parameter is an optional object that will prefill information into the iframe. The best way for React to track the changes and re-render the iframe with updated information is to set this object to a trackable state object. We also pass an ENV variable `process.env.REACT_APP_AGENT_URL` in the function to handle the required Agent URL. Coming from a `.env` file that manages "secrets."

## Modal

This component embeds the Bestow application in an iframe in the center of the screen.

The embedded iframe is expanded (popped up) when a specific HTML element is clicked on the
parent webpage. Clicking the close icon within the embedded component will close the iframe.

### Demo

A demonstration of the modal component can be seen by visiting https://protect-lite.bestowlabs.com/portfolio
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

> :bangbang:  Using the `latest` version in a production environment is not recommended. It could lead to undesired
> results as new features are released. Using a specific version is recommended to establish a deterministic experience.

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
<br/>


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

### Major Frameworks intergration (React)

While the Modal component is plug and play, there are a few steps to be completed to optimize it for popular javascript frameworks, such as [React](https://github.com/facebook/create-react-app).

Utilize the method that works best for loading scripts into your application, using a popular library such as [react-helmet](https://github.com/nfl/react-helmet) or a custom loader function like the example provided below at the top of your parent page:

<br/>


```javascript
  useEffect(() => {
    const modalScript = document.createElement('script');
    modalScript.src = `https://protect-lite.bestow.com/static/v1/iframe/accordion/bestow-modal-latest.js`;
    modalScript.async = true;
    document.body.appendChild(modalScript);
  }, []);
```

<br/>

In the example above, we utilize a popular React hook called: useEffect, so that the script is loaded at the time of page load. 

<br/>


```javascript
const openBestowModal = () => {
    window.BestowModal?.setup(
      'get-quote-modal',
      process.env.REACT_APP_AGENT_URL,
      currentUser,
      true,
    );
  };
  return(
    <button id="get-quote-modal" onClick={openBestowModal}>
      <li className="py-0.5">Life Insurance</li>
    </button>
  )
```

<br/>

In the above example we assign `openBestowModal`, to the BestowModal setup function so that we can assign an onClick event to the `<button id="get-quote-modal" onClick={openBestowModal}>`. Doing so causes the BestowModal setup function to invoke when the button is clicked, allowing the iframe to handle creating the iframe DOM element and handling logic. We have created the `currentUser` variable used in this example. As stated earlier in this guide, this parameter is an optional object that will prefill information into the iframe. The best way for React to track the changes and re-render the iframe with updated information is to set this object to a trackable state object. We also pass an ENV variable `process.env.REACT_APP_AGENT_URL` in the function to handle the required Agent URL. Coming from a `.env` file that manages "secrets."

<br/>
