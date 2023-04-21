import { defineNuxtModule, addPlugin, addServerPlugin, createResolver } from '@nuxt/kit'
import { defu } from 'defu'

import type { BrowserConfig, NodeConfig } from './types'

export interface NuxtAmplitudeOptions {
  client: BrowserConfig | boolean
  server: NodeConfig | boolean
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

        addPlugin(resolver.resolve('./runtime/plugin.client'))
    }

    if (options.server) {
      nuxt.options.runtimeConfig.amplitude = defu(nuxt.options.runtimeConfig.amplitude, {
        config: typeof options.server === 'object' ? options.server as NodeConfig : undefined
      })

      addPlugin(resolver.resolve('./runtime/plugin.server'))
      addServerPlugin(resolver.resolve('./runtime/plugin.nitro'))
    }
  }
})



