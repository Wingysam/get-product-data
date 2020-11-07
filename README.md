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
* Bergdorf Goodman
* Best Buy
* Bing - Shopping
* Christmas Tree Stops & That!
* eBay
* Etsy
* GameStop
* GOAT
* Google Shopping
* IKEA
* Kitchen & Company
* Kohl's
* Macy's
* Neiman Marcus
* Newegg
* PCPartPicker
* Steam
* Target
* Teespring
* Walmart
* Wish

# *Not* Supported Sites
These sites have been considered, but not implemented.

Site | Reason
---- | ------
K-Mart, Sears (Same site) | Requires complicated series of requests to extract data
Nordstrom | Couldn't extract data, please open a PR if you can make it work
