# Clickjacking Demo

This demo shows how the Bestow login page can be clickjacked and a way to prevent it.

It captures the users email and password unknowingly when they click
the login button.

In order to prevent a page from being clickjacked, you can utilize the
`Content-Security-Policy` response header from the server hosting
the website. This allows you to specify specific URLs or domains that can
iframe your content. Or you can disable iframing capabilities altogether.

* https://cheatsheetseries.owasp.org/cheatsheets/Clickjacking_Defense_Cheat_Sheet.html
* https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors

The demo serves on 2 different ports.
* http://localhost:4003 -> Acts as a reverse proxy for https://login.bestow.com providing the ability
to add the `Content-Security-Policy` header.
* http://localhost:4004 -> The "evil" site that is attempting to click the 
Bestow login page being hosted by the reverse proxy above.

## How to run

**NOTE: Golang must be installed on your machine to run this demo**

The demo can be ran in two different modes. Secured or unsecured.

### Secured

Running the demo secured will prevent the "evil" site from loading the bestow login page
in an iframe.

* Run the following command to start the demo in secure mode.
  * `go run main.go --secure`
* Open a browser and the devtools window.
* Navigate to http://localhost:4004
  * You may have to hard refresh to clear the cache
* Notice that the browser prevented the iframed content from being loaded in the iframe.
* Notice the message in the console indicating the error.
* Press Ctrl-C to stop the demo.

## Unsecured

Running the demo unsecured will allow the "evil" site to load the bestow login page
in an iframe.

* Run the following command to start the demo in unsecure mode.
    * `go run main.go`
* Open a browser and the devtools window.
* Navigate to http://localhost:4004
  * You may have to hard refresh to clear the cache
* Notice that the browser allowed the iframed content to be loaded in the iframe.
* Notice the message in the console indicating the error.
* Press Ctrl-C to stop the demo.
