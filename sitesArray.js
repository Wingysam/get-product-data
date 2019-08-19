const path = require('path');
const fs = require('fs');

const files = fs.readdirSync(path.join(__dirname, 'sites'));

module.exports = files.map(filename => {
  if (!filename.endsWith('.js')) return;
  return require(
    path.join(
      __dirname,
      'sites',
      filename
    )
  )
})
  .filter(file => file);