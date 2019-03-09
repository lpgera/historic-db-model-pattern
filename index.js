require('@babel/register')({
  extensions: ['.js', '.ts'],
})
require('./src/index')

process.on('unhandledRejection', error => {
  console.error(error)
  process.exit(1)
})
