const withWorkbox = require("next-with-workbox");

module.exports = {
    
  };

module.exports = withWorkbox({
  images: {
    domains: [
      'images.ctfassets.net',
      'spike-images.s3.eu-central-1.amazonaws.com',
      'casino-squad.b-cdn.net',
      'casino-squad.com'
    ],
  },
  workbox: {
    dest: "public",
    swDest: "sw.js",
    swSrc: "public/worker.js",
    force: true,
    maximumFileSizeToCacheInBytes: 10000000
  },
});