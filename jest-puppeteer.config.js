module.exports = {
  server: {
    command: 'node node_modules/.bin/react-scripts start',
    port: 3000,
    launchTimeout: 60000,
    debug: true,
  },
  launch: {
    headless: false,
    ignoreHTTPSErrors: true,
    args: ['--no-sandbox'],
  }
}