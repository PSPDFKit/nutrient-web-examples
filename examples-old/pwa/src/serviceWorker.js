/**
 * This file contains the Service Worker definition. To reduce boilerplate, we
 * use Workbox that is a library from Google which makes it easy to manage
 * Service Workers and cache assets.
 *
 * In our simple PWA application, we want to precache all the assets except for
 * the actual PDF documents, which are stored in IndexedDB.
 *
 * To do so we define a workbox-config.js in the root our repository.
 */
importScripts("scripts/vendor/workbox-sw/workbox-sw.js");

/**
 * When running `npm start` workbox-cli will automatically generate a manifest
 * from workbox-config.js and replace the call below with it.
 */
workbox.precaching.precacheAndRoute([], { ignoreUrlParametersMatching: [/./] });

self.addEventListener("message", (event) => {
  if (event.data.action === "skipWaiting") {
    console.log("Service worker recived skipWaiting action.");
    self.skipWaiting();
  }
});
self.__WB_MANIFEST;
