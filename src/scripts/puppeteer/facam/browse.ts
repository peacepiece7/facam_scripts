import { delay } from '../../../utils'
import initPuppeteer from '../init'

/**
 * @description 로그인 합니다.
 */
export default async function signIn(url: string) {
  const { browser, page } = await initPuppeteer()
  await page.goto(url, {
    waitUntil: 'networkidle0',
  })

  await page.waitForSelector('#app > section > div > div > div.css-ipkuul')
  await delay(2000)
  // * 로그인 시도
  await page.click('#app > section > div > div > div.css-ipkuul > form > div.fc-input.css-a3qll7 > input')
  await page.keyboard.type('scv7282@gmail.com', {
    delay: Math.random() * 100 + 50,
  })
  await page.click('#app > section > div > div > div.css-ipkuul > form > div.fc-input.css-dzbfzw > input')
  await page.keyboard.type('12345678', {
    delay: Math.random() * 100 + 50,
  })
  await delay(1000)
  await page.click('#app > section > div > div > div.css-ipkuul > form > button')
  await delay(5000)

  const list = ['https://fastcampusbootcamp.skillflo.io/classroom/11131/10477/content/59797']

  for (let i = 0; i < list.length; i++) {
    await page.goto(list[i], {
      waitUntil: 'networkidle0',
    })
    await delay(5000)
    await page.evaluate(() => {
      // * 모든 Header를 오픈
      Array.from(document.querySelectorAll('path'))
        .filter(
          (path) =>
            path.getAttribute('d') ===
            'M3.23123 5.23964C3.53954 4.92012 4.03941 4.92012 4.34772 5.23964L8 9.02473L11.6523 5.23964C11.9606 4.92012 12.4605 4.92012 12.7688 5.23964C13.0771 5.55916 13.0771 6.0772 12.7688 6.39672L8.55824 10.7604C8.24993 11.0799 7.75007 11.0799 7.44176 10.7604L3.23123 6.39672C2.92292 6.0772 2.92292 5.55916 3.23123 5.23964Z',
        )
        .map((path) => path.closest('header')?.click())
    }, [])
    await delay(1000)
    // * 모든 Chapter를 오픈
    await page.evaluate(() => {
      Array.from(document.querySelectorAll('path'))
        .filter(
          (path) =>
            path.getAttribute('d') ===
            'M3.23123 5.23964C3.53954 4.92012 4.03941 4.92012 4.34772 5.23964L8 9.02473L11.6523 5.23964C11.9606 4.92012 12.4605 4.92012 12.7688 5.23964C13.0771 5.55916 13.0771 6.0772 12.7688 6.39672L8.55824 10.7604C8.24993 11.0799 7.75007 11.0799 7.44176 10.7604L3.23123 6.39672C2.92292 6.0772 2.92292 5.55916 3.23123 5.23964Z',
        )
        .map((path) => path.closest('div')?.click())
    }, [])
    await delay(1000)
    // * 모든 Section을 오픈
    const linkList = await page.evaluate(() => {
      let highLightClass = 'css-1ojcx0h'
      return Array.from(document.querySelectorAll("div[data-e2e='index-link']")).map((div) => {
        return {
          isActive: div.classList.contains(highLightClass),
          title: div.textContent,
        }
      })
    }, [])
    console.log('linkList :', linkList)

    const src = await page.evaluate(() => {
      return {
        video: (document.querySelector('#kollus_player_html5_api') as HTMLVideoElement)?.src,
        src: Array.from(document.querySelectorAll('iframe')).map((i) => i.src),
      }
    })
    console.log('VIDEO SOURCE : ', src)
    await delay(1000000)
  }
}
