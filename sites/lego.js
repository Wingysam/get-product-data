const { URL } = require('url')

const HttpsProxyAgent = require('https-proxy-agent')
const fetch = require('node-fetch')

const PRODUCT_QUERY = `
  query LegoProduct($slug: String!) {
    product(slug: $slug) {
      ... on SingleVariantProduct {
        name
        primaryImage
        variant {
          price {
            formattedAmount
          }
        }
      }
    }
  }
`

module.exports = {
  name: 'LEGO',
  URLs: [
    /^https?:\/\/(www\.)?lego\.com\/[a-z]{2}-[a-z]{2}\/product\/.+/i
  ],
  testCases: [
    {
      name: 'Eiffel tower',
      price: '$629.99',
      image: 'https://www.lego.com/cdn/cs/set/assets/blt0e2b04c977a2dc2a/10307.png',
      url: 'https://www.lego.com/en-us/product/eiffel-tower-10307'
    },
    {
      name: 'Millennium Falcon™',
      price: '$849.99',
      image: 'https://www.lego.com/cdn/cs/set/assets/blt3349f56c6f192e18/75192_Prod.png',
      url: 'https://www.lego.com/en-us/product/millennium-falcon-75192'
    },
    {
      name: 'Red Five X-wing Starfighter™',
      price: '$199.99',
      image: 'https://www.lego.com/cdn/cs/set/assets/bltf35138c827a94df0/10240.jpg',
      url: 'https://www.lego.com/en-us/product/red-five-x-wing-starfighter-10240'
    },
    {
      name: 'Le croiseur d’assaut de classe Venator',
      price: '79,99 €',
      image: 'https://www.lego.com/cdn/cs/set/assets/bltc42756bf25d0dfb6/75441_Prod_en-gb.png',
      url: 'https://www.lego.com/fr-fr/product/venator-class-attack-cruiser-75441'
    },
    {
      name: 'Eiffelturm',
      price: '629,99 €',
      image: 'https://www.lego.com/cdn/cs/set/assets/blt0e2b04c977a2dc2a/10307.png',
      url: 'https://www.lego.com/de-de/product/eiffel-tower-10307'
    }
  ],
  async getter (url, proxy) {
    const parsed = new URL(url)
    const pathParts = parsed.pathname.split('/')
    const slug = pathParts[pathParts.length - 1]
    // Convert locale from "en-us" to "en-US" format
    const localeRaw = pathParts[1] || 'en-us'
    const locale = localeRaw.replace(/^([a-z]{2})-([a-z]{2})$/i, (_, lang, country) => `${lang.toLowerCase()}-${country.toUpperCase()}`)

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36',
        Accept: 'application/json',
        'x-locale': locale
      },
      body: JSON.stringify({
        query: PRODUCT_QUERY,
        variables: { slug },
        extensions: { locale }
      })
    }
    if (proxy) options.agent = new HttpsProxyAgent(new URL(proxy))

    const res = await fetch('https://www.lego.com/api/graphql/LegoProduct', options)
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`)

    const json = await res.json()
    const product = json?.data?.product

    const name = product?.name || undefined
    const rawPrice = product?.variant?.price?.formattedAmount
    // Normalize non-breaking spaces (U+00A0) used in European price formatting
    const price = rawPrice ? rawPrice.replace(/ /g, ' ') : undefined
    const image = product?.primaryImage || undefined

    return { name, price, image }
  }
}
