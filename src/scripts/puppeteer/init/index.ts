import puppeteer, { Browser, Page } from 'puppeteer'
import referers from '../../../assets/referers.json' assert { type: 'json' }
import userAgents from '../../../assets/userAgents.json' assert { type: 'json' }

// * puppeteer를 초기화합니다.
export default async function initPuppeteer(): Promise<{ browser: Browser; page: Page }> {
  // * referer와 agent를 설정합니다.
  const randomReferers = referers[Math.floor(Math.random() * referers.length)]
  const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)]
  const browser = await puppeteer.launch({
    headless: false,
    devtools: false,
  })
  const page = await browser.newPage()
  page.setUserAgent(randomUserAgent)
  await page.setUserAgent(randomUserAgent)
  await page.setExtraHTTPHeaders({ referers: randomReferers })
  return { browser, page }
}
