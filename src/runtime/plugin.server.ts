import * as amplitude from '@amplitude/analytics-node'

import { defineNuxtPlugin, useRuntimeConfig } from '#imports'

export default defineNuxtPlugin(_nuxtApp => {
  const config = useRuntimeConfig().amplitude.config

  if (typeof config === 'object') {
    amplitude.init(config.apiKey, config.options)
  }

  return {
    provide: {
      amplitude,
    }
  }
})

