const puppeteer = require('puppeteer');

module.exports = async url => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const name = await page.$eval('gx-product-title > h1.title', element => {
    return element.textContent;
  });
  await browser.close();
  return { name };
};
