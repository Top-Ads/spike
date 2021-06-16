import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching"
import {ExpirationPlugin} from 'workbox-expiration'
import {registerRoute} from 'workbox-routing'
import {StaleWhileRevalidate, CacheFirst, NetworkFirst} from 'workbox-strategies'
import {CacheableResponsePlugin} from 'workbox-cacheable-response'

precacheAndRoute(self.__WB_MANIFEST)
cleanupOutdatedCaches()

//For images
registerRoute(
  new RegExp('\.(?:png|gif|jpg|jpeg|webp|svg)$'),
  new CacheFirst ({
      cacheName:'image-caches',
      plugins: [
          new CacheableResponsePlugin({
              statuses: [0, 200]
          }),
          new ExpirationPlugin({
              maxEntries: 20,
              maxAgeSeconds: 12 * 60 * 60
          })
      ]
  }), 'GET' );
    
//For JS/CSS
/*
Resources are requested from both the cache and the network in parallel. 
The strategy will respond with the cached version if available, otherwise wait for the network response. 
The cache is updated with the network response with each successful request
*/
registerRoute(
  new RegExp('\.(?:js|css)$'),
  new StaleWhileRevalidate({
      cacheName:'js-css-caches',
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200]
        }),
        new ExpirationPlugin({
          maxEntries: 20,
          maxAgeSeconds: 12 * 60 * 60
        })
      ]
    })
)
        

//For HTML
registerRoute(
  new RegExp('/'),
  new NetworkFirst ({
      cacheName:'html-caches',
      plugins: [
          new CacheableResponsePlugin({
              statuses: [0, 200]
          }),
          new ExpirationPlugin({
              maxEntries: 20,
              maxAgeSeconds: 12 * 60 * 60
          })
      ]
  }), 'GET' );
  
//Other resources
registerRoute(
  new RegExp('/_next/static/'),
  new StaleWhileRevalidate({
      cacheName: 'static-caches',  
  })
);

// Cache Google Fonts with a stale-while-revalidate strategy, with
// a maximum number of entries.
registerRoute(
  ({url}) => url.origin === 'https://spikewebsitemedia.b-cdn.net/spike_v2/fonts/Montserrat-Black',
  new StaleWhileRevalidate({
    cacheName: 'montserrat-font',
    plugins: [
      new ExpirationPlugin({maxEntries: 20}),
    ],
  }),
);