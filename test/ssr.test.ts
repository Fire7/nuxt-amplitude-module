import { describe, it, expect } from 'vitest'
import { fileURLToPath} from 'node:url'
import { setup, $fetch } from '@nuxt/test-utils'

describe('ssr', async () => {
  await setup({
    rootDir:  fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
    server: true,
    nuxtConfig: {
      // @ts-ignore
      amplitude: {
        client: true,
        server: true,
      },
    },
  })

  it('amplitudeNode available in nuxt', async () => {
    const html = await $fetch('/')
    expect(html).toContain('isAmplitudeAvailable: ✅')
    expect(html).toContain('isAmplitudeBrowser: ❌')
    expect(html).toContain('isAmplitudeNode: ✅')
  })

  it('amplitudeNode available in nitro', async () => {
    const result = await $fetch('/api/example')
    expect(result.isAmplitudeAvailable).toBe(true)
  })
})
