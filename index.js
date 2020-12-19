const { sitesArray } = require('./util')

const sites = sitesArray()

async function fetchData (getter, url, proxy) {
  const data = await getter(url, proxy)
  if (data.name) data.name = data.name.trim()
  return data
}

module.exports = async (url, proxy) => {
  for (let i = 0; i < sites.length; i++) {
    for (let j = 0; j < sites[i].URLs.length; j++) {
      if (sites[i].URLs[j].test(url)) {
        return fetchData(sites[i].getter, url, proxy)
      }
    }
  }
  return fetchData(require('./sites/_generic').getter, url, proxy)
}

module.exports.sites = sites
