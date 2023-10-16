import axios from 'axios'
import { ProductRequestBody, ProductSource } from '@/types/index.js'
import initPuppeteer from '../../init/index.js'
import getProductDetail from '../getProductDetail/index.js'
import { convertSrcToBase64, delay } from '../../../../utils/index.js'

// * product를 서버에 저장합니다.
export default async function setProductDetails(products: ProductSource[]) {
  const { browser, page } = await initPuppeteer()
  // * products를 순회하면서 product를 서버에 저장합니다.
  for (let i = 0, len = products.length; i < len; i++) {
    const product = await getProductDetail(page, products[i])

    console.log('아이피가 차단 될 수 있기 때문에 20 ~ 30초 대기..')
    await delay(Math.floor(Math.random() * 10000) + 20000)

    const { imgSrc } = product
    const thumbnailBase64 = await convertSrcToBase64(imgSrc)

    const productRequestBody: ProductRequestBody = {
      title: product.title,
      price: product.price ? product.price : 1000,
      tags: product.genres,
      description: product.description ? product.description : 'no description',
      thumbnailBase64,
    }

    if (productRequestBody.tags?.length === 0) {
      console.log('title : ', productRequestBody.title)
      console.log('태그가 없는 상품은 추가하지 않습니다.')
      continue
    }
    if (!productRequestBody.thumbnailBase64) {
      console.log('title : ', productRequestBody.title)
      console.log('제목이 없는 상품은 추가하지 않습니다.')
      continue
    }
    if (process.env.NODE_ENV === 'development') {
      console.log('개발 모드에서는 데이터를 추가하지 않습니다.')
      const { thumbnailBase64, ...rest } = productRequestBody
      console.log('productRequestBody :', rest)
      console.log('thumbnailBase64 slice first 100 char:', thumbnailBase64.slice(0, 100))
      continue
    }
    // * 서버에서 product를 추가합니다.
    await axios(' https://asia-northeast3-heropy-api.cloudfunctions.net/api/products', {
      method: 'POST',
      data: JSON.stringify(productRequestBody),
      headers: {
        'Content-Type': 'application/json',
        masterKey: true,
        apikey: 'KDT5_nREmPe9B',
        username: 'KDT5_Team6',
      },
    })
    console.log('데이터를 추가했습니다 : ', productRequestBody.title)
  }
  await page.close()
  await browser.close()
}
