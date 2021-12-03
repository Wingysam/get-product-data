const { URL } = require('url')

const cheerio = require('cheerio')
const HttpsProxyAgent = require('https-proxy-agent')
const fetch = require('node-fetch')

module.exports = {
  name: 'bol.com',
  URLs: [
    /^https?:\/\/(www\.)?bol.com\/[a-z]*\/[a-z]*\/p\/[a-zA-Z0-9_.-]*\/[0-9]*\/(.+)$/i
  ],
  testCases: [
    {
      name: 'OTRONIC® 18650 batterijhouder dubbel',
      price: '€4,49',
      image: 'https://media.s-bol.com/m2XApL0MLogA/8q9vYO3/168x106.jpg',
      url: 'https://www.bol.com/be/nl/p/otronic-18650-batterijhouder-dubbel/9300000039572096/?s2a='
    },
    {
      name: 'Logitech MX Keys - Draadloos toetsenbord met verlichting - QWERTY',
      price: '€94,90',
      image: 'https://media.s-bol.com/L9ZQ4Pv2Y464/168x81.jpg',
      url: 'https://www.bol.com/be/nl/p/logitech-mx-keys-draadloos-toetsenbord-met-verlichting-qwerty/9200000118468088/?bltgh=kT--w1KRY83K8Ev4Sj1DHQ.2_19.22.ProductImage'
    }
  ],
  async getter (url, proxy) {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36'
      }
    }
    if (proxy) options.agent = new HttpsProxyAgent(new URL(proxy))
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`)

    const html = await res.text()
    const $ = cheerio.load(html)

    const data = JSON.parse($('script[type="application/ld+json"]').last().html())
    let name, price, image

    if (!name) name = data.name

    // Original MR used this as an array, maybe it's an array only when there are multiple?
    const offer = data.offers?.price ?? data.offers[0]?.price
    if (!price) price = offer ? `€${offer}` : 'No offers found'

    if (!image) image = data.image.url

    return { name, price, image }
  }
}
