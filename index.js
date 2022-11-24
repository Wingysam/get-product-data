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
  for (let i = 0; i < sites.length; i++) {
    for (let j = 0; j < sites[i].URLs.length; j++) {
      if (sites[i].URLs[j].test(url)) {
        return fetchData(sites[i].getter, url, proxy, timeout)
      }
    }
  }
  return fetchData(require('./sites/_generic').getter, url, proxy)
}

module.exports.sites = sites
