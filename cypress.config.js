module.exports = {
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'mochawesome-report',
    overwrite: false,
    html: false,
    json: true,
  },
  e2e: {
   
    baseUrl: 'http://localhost:3000/',
  },
}
