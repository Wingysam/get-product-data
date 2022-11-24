const { sitesArray } = require('./util')

const sites = sitesArray()

const sleep = time => new Promise(resolve => setTimeout(resolve, time))

async function fetchData (getter, url, proxy, timeout = 10000) {
  const data = await Promise.race([
    getter(url, proxy),
    sleep(timeout)
  ])
  if (!data) throw new Error(`Timed out after ${timeout} milliseconds.`)
  if (data.name) data.name = data.name.trim()
  return data
}

module.exports = async (url, proxy, timeout) => {
  for (const site of sites) {
    for (const regex of site.URLs) {
      if (regex.test(url)) return fetchData(site.getter, url, proxy, timeout)
    }
  }
  return fetchData(require('./sites/_generic').getter, url, proxy)
}

module.exports.sites = sites
