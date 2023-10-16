import { ProductSource } from 'src/types/index.js'
import { delay } from '../../../../utils/index.js'
import initPuppeteer from '../../init/index.js'

// * product list를 스크랩합니다.
export default async function productsScrapper(url: string): Promise<ProductSource[]> {
  const { browser, page } = await initPuppeteer()
  await page.goto(url, {
    waitUntil: 'networkidle0',
  })
  await page.waitForSelector('#maincontent > div.columns > div.column.main')
  await delay(2000)

  const productList = await page.evaluate(() => {
    const main = document.querySelector('#maincontent > div.columns > div.column.main')
    const _productList = main?.querySelectorAll('.category-product-item')
    if (typeof _productList == 'undefined') return []
    return Array.from(_productList).map((item) => {
      const title = item?.querySelector('a.category-product-item-title-link')?.textContent?.trim()
      const link = (item?.querySelector('a.category-product-item-title-link') as HTMLAnchorElement)?.href
      const thumbSrc = (item.querySelector('img.product-image-photo') as HTMLImageElement)?.src
      return {
        title: title ? title : '',
        link: link ? link : '',
        thumbSrc: thumbSrc ? thumbSrc : '',
      }
    })
  }, [])
  await page.close()
  await browser.close()
  return productList
}
