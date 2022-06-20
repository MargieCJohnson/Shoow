import "core-js/stable";
import "regenerator-runtime/runtime";
import "whatwg-fetch"; // fetch polyfill
import "url-search-params-polyfill"; // URLSearchParams polyfill
import "normalize.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./containers/App";
import "./index.scss";
import "./responsive.scss";

ReactDOM.render(
  <>
  <Router>
        <App />
  </Router>
  </>, 
  document.querySelector('#root')
);

if ('serviceWorker' in navigator) {
   window.addEventListener('load', () => {
     navigator.serviceWorker.register('/service-worker.js').then(registration => {
       console.log('SW registered: ', registration);
     }).catch(registrationError => {
       console.log('SW registration failed: ', registrationError);
     });
   });
 }

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});