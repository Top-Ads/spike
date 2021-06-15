
const withWorkbox = require("next-with-workbox")

module.exports = withWorkbox({
  workbox: {
    swSrc:'/public/service-worker.js'
  },
  images: {
    domains: [
      'images.ctfassets.net',
      'spike-images.s3.eu-central-1.amazonaws.com',
      'casino-squad.b-cdn.net',
      'casino-squad.com'
    ],
  },
});