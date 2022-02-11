package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"os/signal"
	"syscall"
)

const (
	loginPort    = "localhost:4003"
	evilPort     = "localhost:4004"
	realLoginURL = "https://login.bestow.com"
)

var secure bool

func main() {
	secureFlag := flag.Bool("secure", false, "Run reverse proxy securely. "+
		"e.g. Content cannot be iframed unless from specific host")
	flag.Parse()

	if secureFlag != nil {
		secure = *secureFlag
	}

	done := make(chan os.Signal, 1)
	signal.Notify(done, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)

	log.Printf("Running...\nsecure=%v\n\nEvil site at http://%s\nBestow login reverse proxy at http://%s\n\n",
		secure, evilPort, loginPort)

	go serveEvilSite()
	go serveBestowLoginProxy()

	<-done
	log.Println("Stopped")
}

func serveEvilSite() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "index.html")
	})

	log.Fatal(http.ListenAndServe(evilPort, mux))
}

func serveBestowLoginProxy() {
	// Parse the login url
	loginURL, _ := url.Parse(realLoginURL)

	// Create the reverse proxy
	proxy := httputil.NewSingleHostReverseProxy(loginURL)

	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {

		// If running securely, add content security policy header to prevent evil site from iframing.
		allowedAddress := "http://" + evilPort
		if secure {
			allowedAddress = "http://" + loginPort
		}

		// Add the content security policy header.
		securityPolicy := fmt.Sprintf("frame-ancestors %s;", allowedAddress)
		w.Header().Add("Content-Security-Policy", securityPolicy)

		r.URL.Host = loginURL.Host
		r.URL.Scheme = loginURL.Scheme
		r.Header.Set("X-Forwarded-Host", r.Header.Get("Host"))
		r.Host = loginURL.Host

		proxy.ServeHTTP(w, r)
	})

	log.Fatal(http.ListenAndServe(loginPort, mux))
}
