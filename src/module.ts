import { defineNuxtModule, addPlugin, addServerPlugin, createResolver, getNuxtVersion, addVitePlugin } from '@nuxt/kit'
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
      nuxt: '>=3.0.0'
    }
  },
  defaults: {
    client: true,
    server: false,
  },
  setup (options, nuxt) {
    const isNuxt4OrAbove = Number(getNuxtVersion(nuxt).split('.')[0]) >= 4

    const resolver = createResolver(import.meta.url)

    // Vite plugin for adding @amplitude/analytics-* to optimizeDeps.include
    addVitePlugin(() => ({
      name: 'nuxt-amplitude-module-vite-plugin',
      config (config) {
        config.optimizeDeps ||= {}
        config.optimizeDeps.include ||= []
        config.optimizeDeps.exclude ||= []

        if (options.client) {
          config.optimizeDeps.include.push(
              '@amplitude/analytics-browser',
            )
        }

        if (options.server) {
          config.optimizeDeps.include.push(
              '@amplitude/analytics-node',
            )
        }
      }
    }))

    // Client plugin
    if (options.client) {
      nuxt.options.runtimeConfig.public.amplitude = defu(nuxt.options.runtimeConfig.public.amplitude, {
        config: typeof options.client === 'object' ? options.client as BrowserConfig : undefined,
      })

      addPlugin(resolver.resolve('./runtime/plugin.client'))

      if (isNuxt4OrAbove) {
        nuxt.options.typescript.tsConfig.include ??= []
        nuxt.options.typescript.tsConfig.include.push(resolver.resolve('./declarations/nuxt-amplitude-module-client.d.ts'))
      }
    }

    // Server plugins (nitro and nuxt)
    if (options.server) {
      nuxt.options.runtimeConfig.amplitude = defu(nuxt.options.runtimeConfig.amplitude, {
        config: typeof options.server === 'object' ? options.server as NodeConfig : undefined
      })

      addPlugin(resolver.resolve('./runtime/plugin.server'))
      addServerPlugin(resolver.resolve('./runtime/plugin.nitro'))

      if (isNuxt4OrAbove) {
        nuxt.options.nitro.typescript ??= {}
        nuxt.options.nitro.typescript.tsConfig ??= {}
        nuxt.options.nitro.typescript.tsConfig.include ??= []
        nuxt.options.nitro.typescript.tsConfig.include.push(resolver.resolve('./declarations/nuxt-amplitude-module-server.d.ts'))
      }
    }
  }
})



