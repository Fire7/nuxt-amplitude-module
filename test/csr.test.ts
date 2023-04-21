import { describe, it, expect } from 'vitest'
import { fileURLToPath} from 'node:url'
import { setup, url, createPage } from '@nuxt/test-utils'

describe('csr', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
    browser: true,
    nuxtConfig: {
      ssr: false,
      // @ts-ignore
      amplitude: {
        client: true,
        server: true,
      },
    },
  })

  it('amplitudeBrowser available in nuxt', async () => {
    const home = url('/')
    const page = await createPage()
    await page.goto(home)
    const html = await page.content()
    expect(html).toContain('isAmplitudeAvailable: ✅')
    expect(html).toContain('isAmplitudeBrowser: ✅')
    expect(html).toContain('isAmplitudeNode: ❌')
  })
})

