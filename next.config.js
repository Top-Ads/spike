module.exports = {
    env: {
      development: process.env.DEV,
      stagging: process.env.STAG,
      production: process.env.PROD
    },
    images: {
      domains: ['images.ctfassets.net'],
    },
  };