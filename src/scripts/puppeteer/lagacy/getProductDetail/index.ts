import { Page } from 'puppeteer'
import { ProductDetailSource, ProductSource } from '../../../../types/index.js'
import { delay } from '../../../../utils/index.js'

// * product 상세 정보를 가져옵니다.
export default async function setProductDetail(page: Page, product: ProductSource): Promise<ProductSource & ProductDetailSource> {
  await page.goto(product.link, {
    waitUntil: 'networkidle0',
  })
  await page.waitForSelector('#maincontent')
  await delay(1500)
  const price = await page.evaluate(() => {
    const container = document.querySelector('.price-container') as HTMLSpanElement
    const meta = container.querySelector("meta[itemprop='price']") as HTMLMetaElement
    const priceStr = meta?.content ? meta.content : 0
    return Number(priceStr)
  })
  const imgSrc = await page.evaluate(() => {
    return (document.querySelector('.fotorama-item img') as HTMLImageElement)?.src
  })
  const description = await page.evaluate(() => {
    const descriptionCover = document.querySelector('#maincontent > div.columns > div > div.product-page-container > div.product-page-media > div.product.attribute.mfr_description') as HTMLDivElement
    const highlightText = Array.from(descriptionCover.querySelectorAll('strong'))
      .filter((item) => {
        if (item?.textContent?.includes('알림')) return false
        if (item?.textContent?.includes('메이커로부터의 설명입니다')) return false
        return true
      })
      .map((item) => `<p>${item.textContent?.trim()}</p>`)
      .join('\n')
      .trim()
    return highlightText
  })
  const genres = await page.evaluate(() => {
    const genreText = document.querySelector(
      '#maincontent > div.columns > div > div.product-page-container > div.product-page-media > div.product-attributes > div.product-attributes-all > div:nth-child(1) > div.product-attribute.game_category > div.product-attribute-val',
    ) as HTMLDivElement
    if (!genreText) return []
    const content = genreText.textContent?.split(',').map((item) => item.trim())
    return content ? content : []
  })

  return {
    ...product,
    price,
    imgSrc,
    genres,
    description,
  }
}
