# get-product-name
![NPM Stats](https://nodei.co/npm/get-product-name.png?downloads=true&downloadRank=true&stars=true)

```js
const getProductName = require('get-product-name');

const url = 'http://a.co/d/0oMSrUW ';

async function main() {
  const productData = await getProductName(url);
  console.log(productData);
  // { name:
  //    'Fire TV Stick with 1st Gen Alexa Voice Remote, streaming media player' }
}

main();
```

# Supported Sites
* Amazon
* Best Buy
* Christmas Tree Stops & That!
* eBay
* GameStop
* Google Express
* Kitchen & Company
* Kohl's
* Macy's
* Newegg
* Target
* Walmart