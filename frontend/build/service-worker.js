/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

importScripts(
<<<<<<< HEAD
  "/precache-manifest.df379026901d99ae5e02ad5c8d482927.js"
=======
<<<<<<< HEAD
  "/precache-manifest.62e9a66fda5691d98eac3989fcb096af.js"
=======
  "/precache-manifest.bcccd30fa128d0fe9df7f1780d90c633.js"
>>>>>>> 7bd23eee8ad560df3b2d7dde447459ab8f3fce66
>>>>>>> f80c17591d4f47c52fd5b28bd2c33e9d22e8c1cf
);

workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("/index.html", {
  
  blacklist: [/^\/_/,/\/[^/]+\.[^/]+$/],
});
