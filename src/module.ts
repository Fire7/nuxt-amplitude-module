import { defineNuxtModule, addPlugin, addServerPlugin, createResolver, extendViteConfig } from '@nuxt/kit'
import { defu } from 'defu'

import type { BrowserConfig, NodeConfig } from './types'

export interface NuxtAmplitudeOptions {
  client: BrowserConfig
  server: NodeConfig
}

export default defineNuxtModule<NuxtAmplitudeOptions>({
  meta: {
    name: 'nuxt-amplitude-ts',
    configKey: 'amplitude',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {
    client: true,
    server: false,
  },
  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)

    if (options.client) {
      nuxt.options.runtimeConfig.public.amplitude = defu(nuxt.options.runtimeConfig.public.amplitude, {
        config: typeof options.client === 'object' ? options.client as BrowserConfig : undefined,
      })

      extendViteConfig((config) => {
        config.optimizeDeps = config.optimizeDeps || {}
        config.optimizeDeps.include = config.optimizeDeps.include || []
        config.optimizeDeps.exclude = config.optimizeDeps.exclude || []
        config.optimizeDeps.include.push(
          '@amplitude/analytics-browser',
        )
      })

      addPlugin(resolver.resolve('./runtime/plugin.client'))
    }

    if (options.server) {
      nuxt.options.runtimeConfig.amplitude = defu(nuxt.options.runtimeConfig.amplitude, {
        config: typeof options.server === 'object' ? options.server as NodeConfig : undefined
      })

      extendViteConfig((config) => {
        config.optimizeDeps = config.optimizeDeps || {}
        config.optimizeDeps.include = config.optimizeDeps.include || []
        config.optimizeDeps.exclude = config.optimizeDeps.exclude || []
        config.optimizeDeps.include.push(
          '@amplitude/analytics-node',
        )
      })

      addPlugin(resolver.resolve('./runtime/plugin.server'))
      addServerPlugin(resolver.resolve('./runtime/plugin.nitro'))
    }
  }
})



