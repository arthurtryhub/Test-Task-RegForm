const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // includeShadowDom: true,
    retries: {
      runMode: 5,
      openMode: 0,
    },
    screenshotOnRunFailure: true,
    screenshotsFolder: "cypress/screenshots",
    viewportHeight: 1080,
    viewportWidth: 1920,

    baseUrl: "https://www.booking.com/",

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
