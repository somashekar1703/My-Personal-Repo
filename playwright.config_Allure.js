// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  retries:2,
  workers:2,
  fullyParallel: true,
  timeout: 150 *1000,// By default, timeout will be 30s...
 // Below timeout is used in assertion.
  expect :{
  timeout: 60000,
},
  reporter:'allure-playwright',
  projects : [
  {
  name:'Google_Chrome', 
  use: {
      browserName:'chromium',//executes in chrome browser...
      headless:false, // to run in browser.. if true, runs headless mode (not in browser)
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