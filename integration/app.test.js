const PollyCore = require('@pollyjs/core');
const Polly = PollyCore.Polly;
const PuppeteerAdapter = require('@pollyjs/adapter-puppeteer');
const FSPersister = require('@pollyjs/persister-fs');
const path = require('path')

function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

const timeout = 10 * 60000
let polly;
describe('app', () => {
  beforeEach(async () => {
    await page.setRequestInterception(true);
    Polly.register(PuppeteerAdapter);
    Polly.register(FSPersister);

    polly = new Polly('App', {
      adapters: ['puppeteer'],
      adapterOptions: {
        puppeteer: { page }
      },
      persister: 'fs',
      // persister: 'rest',
      persisterOptions: {
        fs: { recordingsDir: path.join(__dirname, 'recordings') }
      },
      logging: true
    });
    const { server } = polly;
    server.get('https://localhost:3000/*path').passthrough();

    await page.goto('http://localhost:3000', { waitUntil: 'load', timeout: 0 })
  }, timeout)

  it('should display a react logo', async () => {
    await delay(30000); // Doing some async actions like filling a form and waiting for response
    await expect(page).toMatch('React')

    await polly.stop();
  }, timeout)
}, timeout)
