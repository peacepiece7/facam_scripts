import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

/**
 * @description ms만큼 대기합니다.
 */
export function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms))
}

/**
 * @description src를 base64로 변환합니다.
 */
export async function convertSrcToBase64(src: string) {
  try {
    const response = await axios.get(src, {
      responseType: 'arraybuffer',
    })
    const buffer = Buffer.from(response.data, 'binary').toString('base64')
    return buffer
  } catch (error) {
    console.error(error)
    return ''
  }
}
