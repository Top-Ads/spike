const withWorkbox = require("next-with-workbox");

module.exports = withWorkbox({
  images: {
    domains: [
      'images.ctfassets.net',
      'spike-images.s3.eu-central-1.amazonaws.com',
      'casino-squad.b-cdn.net',
      'casino-squad.com',
      'images.spikeslot.com',
      'spikeapi.eu'
    ],
  },
  workbox: {
    dest: "public",
    swDest: "sw.js",
    swSrc: "public/worker.js",
    force: false,
    maximumFileSizeToCacheInBytes: 10000000 /* 10MB */
  }
});