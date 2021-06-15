
const withWorkbox = require("next-with-workbox")

module.exports = withWorkbox({
  workbox: {
    dest: "public",
    swDest: "service-worker.js",
    maximumFileSizeToCacheInBytes: 10000000
  },
  images: {
    domains: [
      'images.ctfassets.net',
      'spike-images.s3.eu-central-1.amazonaws.com',
      'casino-squad.b-cdn.net',
      'casino-squad.com'
    ],
  },
  future: { webpack5: true }
});