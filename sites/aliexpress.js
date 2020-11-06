const { URL } = require('url')

const HttpsProxyAgent = require('https-proxy-agent')
const fetch = require('node-fetch')

module.exports = {
  name: 'AliExpress',
  URLs: [
    /^https:\/\/(www\.)?aliexpress\.com\/item\/[0-9]*\.html(\?.*)?$/i
  ],
  testCases: [
    {
      name: '30cm Peek a Boo Elephant Stuffed Plush Doll Electric Toy Talking Singing Musical Toy Elephant Play Hide and Seek for Kids Gift',
      price: 'US $12.50',
      image: 'https://ae01.alicdn.com/kf/H31ebcb85b2ae4c0398a6cb96be083cdfh/30cm-Peek-a-Boo-Elephant-Stuffed-Plush-Doll-Electric-Toy-Talking-Singing-Musical-Toy-Elephant-Play.jpg',
      url: 'https://www.aliexpress.com/item/33035720265.html?spm=a2g0o.aipl_landingpage_2_a_currency.001.d4'
    },
    {
      name: 'Universal Capo Guitar Accessories Quick Change Clamp Key Aluminium Alloy Metal Acoustic Classic Guitar Capo for Guitar Parts',
      price: 'US $0.01',
      image: 'https://ae01.alicdn.com/kf/H7503a8c51dd544f89c889b25bffb3879Z/Universal-Capo-Guitar-Accessories-Quick-Change-Clamp-Key-Aluminium-Alloy-Metal-Acoustic-Classic-Guitar-Capo-for.jpg',
      url: 'https://www.Aliexpress.com/item/32975845210.html'
    }
  ],
  async getter (url, proxy) {
    const options = {}
    if (proxy) options.agent = new HttpsProxyAgent(new URL(proxy))
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`)
    const html = await res.text()
    const data = JSON.parse(html.split('                            data: ')[1].split(',\n')[0])
    let name, price, image

    if (!name) name = data.titleModule.subject

    if (!price) price = data.priceModule.formatedActivityPrice

    if (!image) image = data.pageModule.imagePath

    return { name, price, image }
  }
}
