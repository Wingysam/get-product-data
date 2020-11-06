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
* AliExpress
* Amazon
* Best Buy
* Bing - Shopping
* Christmas Tree Stops & That!
* eBay
* GameStop
* GOAT
* Google Shopping
* IKEA
* Kitchen & Company
* Kohl's
* Macy's
* Newegg
* PCPartPicker
* Steam
* Target
* Teespring
* Walmart
* Wish