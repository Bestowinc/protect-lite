# Protect Lite

Partners can now embed Bestow’s application directly within their own website. Providing access to Bestow’s term 
life insurance offering without ever routing customers off their platform to bestow.com.

A couple lines of code can add a life insurance entrypoint to the partner’s platform. This brings the user to
Bestow’s digital application, displayed as an iframe on the partner’s site or mobile app. The iframe
implementation implies Bestow is still hosting the front-end, so they can make changes to add new functionality
anytime as well as maintain insights to user behavior on the application itself to prevent against fraud
(e.g. fullstory monitoring). Approved customers can bind and then return to the partner platform.

With the new iframe solution from Bestow, partners can take advantage of adding an instant-issue term life offering 
to their platform in just a matter of days.

## Partner Integration

Visit the link below to view technical guidance for partner integration.

[Integration Guide](documentation/v1/integration-guide.md)

## Demo

A demo website was created for partners to see how Protect Lite works. A playground to show how the
Bestow application can be embedded into a dummy parent site.

It utilizes javascript setup files to demonstrate easy integration. (See 
[Available Components](documentation/v1/integration-guide.md#available-components))

The demo site is built with [Parcel](https://parceljs.org/).

#### Environments

| Environment | URL                                         |
|-------------|---------------------------------------------|
| Production  | https://protect-lite.bestow.com             |
| Staging     | https://protect-lite.staging.bestowlabs.com |
| UAT         | https://protect-lite.uat.bestowlabs.com     |
| QA          | https://protect-lite.qa.bestowlabs.com      |

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

## Development Setup

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
