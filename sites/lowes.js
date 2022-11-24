const { spawn } = require('child-process-promise')

module.exports = {
  name: 'Lowes',
  URLs: [
    /^https?:\/\/www\.lowes\.com\/.*$/i
  ],
  testCases: [
    {
      name: 'CRAFTSMAN 28-oz. 4-cycle Engines 5w-30 Full Synthetic Engine Oil',
      price: '8.98',
      image: 'https://mobileimages.lowes.com/productimages/4da72cb4-b4cd-42c5-845b-a2602d7144b7/15281156.jpg',
      url: 'https://www.lowes.com/pd/CRAFTSMAN-Craftsman-5W30-Snow-Oil/1002623184'
    },
    {
      name: 'Duraflame Indoor/Outdoor 4.5-lb Fire Log (9-Pack)',
      price: '34.98',
      image: 'https://mobileimages.lowes.com/productimages/a89faaf3-9d02-4899-87be-9219b6d46b59/15897367.jpg',
      url: 'https://www.lowes.com/pd/Duraflame-duraflame-174-4-5lb-Indoor-Outdoor-Firelog-9pk/5000907755'
    }
  ],
  async getter (url, proxy) {
    // Similar to Best Buy, fetch never resolves but curl does for some reason
    const { stdout: html } = await spawn('curl', [url, '-LH', 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:68.0) Gecko/20100101 Firefox/68.0'], {
      env: {
        http_proxy: proxy,
        https_proxy: proxy
      },
      capture: [
        'stdout'
      ]
    })

    const matches = /window\['__PRELOADED_STATE__'\] = ({.*?})</.exec(html)
    if (!matches) throw new Error('Failed to fetch data object')
    const data = JSON.parse(matches[1])
    const productDetails = data.productDetails[data.productId]
    if (!productDetails.product) throw new Error('No product details found')

    const name = productDetails.product?.title ?? 'Unknown Product'
    const price = `${productDetails.price?.itemPrice ?? '???'}`
    const imagePath = productDetails.product?.imageUrls[0]?.value
    const image = imagePath ? `https://mobileimages.lowes.com${imagePath}` : null

    return { name, price, image }
  }
}
