const path = require('path');
const fs = require('fs');

const files = fs.readdirSync(path.resolve('./sites'));

module.exports = files.map(filename => {
  if (!filename.endsWith('.js')) return;
  return require(
    path.join(
      path.resolve('./sites'),
      filename
    )
  )
})
  .filter(file => file);