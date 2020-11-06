const { URL } = require('url')

const cheerio = require('cheerio')
const HttpsProxyAgent = require('https-proxy-agent')
const fetch = require('node-fetch')

module.exports = {
  name: 'Google Shopping',
  URLs: [
    /^https:\/\/express\.google\.com(\/u\/0)?\/product\/([a-z0-9-]*\/)?\w*\/?(\?.*)?$/i,
    /^https:\/\/www.google.com\/shopping\/product\/\d*.*$/i
  ],
  testCases: [
    {
      name: 'Google Chromecast (2nd Generation) - 1080p - Wi-Fi - Black',
      url: 'https://express.google.com/u/0/product/Google-Chromecast-2nd-Generation-1080p-Wi-Fi-Black/12201320268068482524_12770536777640250214_102760793'
    },
    {
      name: 'Super Mario Odyssey [Switch Game]',
      url: 'https://express.GOOGLE.com/u/0/product/Nintendo-Super-Mario-Odyssey-Switch-Game/4699429706850701365_8691361685679756397_125181302'
    },
    {
      name: 'Google WiFi AC1200 Dual-Band Mesh Wi-Fi Router - White',
      url: 'https://www.google.com/shopping/product/17811093614708061273?psb=1&tbm=shop&prds=epd%3A1391942677106388859%2Cprmr%3A3&ved=0CAYQ0FUoAWoXChMIj_fj4sPj5QIVmYRaBR0jNAyDECw'
    }
  ],
  async getter (url, proxy) {
    const options = {}
    if (proxy) options.agent = new HttpsProxyAgent(new URL(proxy))
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`)
    const $ = cheerio.load(await res.text())

    const name = $('.fbrNcd').text() // hackery, probably will break but kbye

    return { name }
  }
}
