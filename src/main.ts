import readline from 'readline'
import productsScrapper from './scripts/puppeteer/lagacy/getProducts/index.js'
import setProductDetail from './scripts/puppeteer/lagacy/setProductsDetail/index.js'
import signIn from './scripts/puppeteer/facam/browse.js'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

async function main() {
  try {
    console.info('Enter a Scrap URL : ')
    rl.on('line', async (line: string) => {
      console.log(line)
      await signIn('https://fastcampusbootcamp.skillflo.io/auth/signin')
      rl.close()
    })
    rl.on('close', () => {
      console.log('스크래핑 종료')
      process.exit(0)
    })
  } catch (err) {
    console.error(err)
    process.exit()
  }
}
main()
