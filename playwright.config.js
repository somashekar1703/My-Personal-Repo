// @ts-check
import { defineConfig, devices } from '@playwright/test';
console.log(`Running in ${process.env.CI ? "CI (headless)" : "local (headed)" } mode`);

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  retries:2,
  timeout: 100 *1000,// By default, timeout will be 30s...
 // Below timeout is used in assertion.
  expect :{
  timeout: 60000,
},
  reporter:'html',
  projects : [
    {
  name:'Microsoft edge', //report will generate in html format...
  use: {

      browserName:'chromium',//executes in chrome browser...
      channel:'msedge',
      headless:process.env.CI ? true : false, // to run in browser.. if true, runs headless mode (not in browser)
      //headless:true,
      viewport:null,
      launchOptions :{
        args:['--start-maximized'],
      },
      screenshot:'only-on-failure', //capture screenshots on failure
      trace:'retain-on-failure', //trace will have screenshot and log of each test in zip file. To generate trace only on failure, we use 'trace-on-failure'
      video: 'retain-on-failure',
    },
  }
  ]
});

