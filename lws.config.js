module.exports = {
  rewrite: [
    {
      from: '/api/*',
      to: 'http://localhost:8080/api/$1'
    }
  ],
  directory: 'dist',
  logFormat: 'stats'
}