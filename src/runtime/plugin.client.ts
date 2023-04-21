import * as amplitude from '@amplitude/analytics-browser'

import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig().public.amplitude.config

  if (typeof config === 'object') {
    amplitude.init(config.apiKey, config.userId, config.options)
  }

  return {
    provide: {
      amplitude
    }
  }
})
